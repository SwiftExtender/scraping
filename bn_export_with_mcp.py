import asyncio
import json
import logging
import os
import re
from typing import Any, Dict, List, Optional, Tuple

import httpx
from mcp import ClientSession
from mcp.client.streamable_http import streamable_http_client

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
HTTP_URL = "http://127.0.0.1:24642/mcp"
HTTP_TOKEN: Optional[str] = None

OUTPUT_DIR = "pseudocode_out"
JSONL_PATH = os.path.join(OUTPUT_DIR, "pseudocode.jsonl")
INDEX_PATH = os.path.join(OUTPUT_DIR, "index.json")

PAGE_SIZE = 1000
MAX_FUNCTIONS: Optional[int] = None    # None = ALL
PER_CALL_DELAY = 0.0

SKIP_TRIVIAL = True
TRIVIAL_NAME_RE = re.compile(
    r"^(?:"
    r"__.*(?:init|fini|stub|cxa|gcc|chk|assert|tls|register|deregister|frame|"
    r"libc|stack|copy|del|dereg)?"
    r"|thunk.*"
    r"|imp\..*"
    r"|j_.*"
    r"|_?start$|entry$"
    r")$",
    re.IGNORECASE,
)

LIST_FUNCTIONS_TOOL = "bn_function_list"
DECOMPILE_TOOL = "bn_function_decompile"
DISASSEMBLY_TOOL = "bn_function_disassembly"

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("bn_extract")


# ---------------------------------------------------------------------------
# MCP result helpers
# ---------------------------------------------------------------------------
def _result_text(result) -> str:
    if result is None:
        return ""
    sc = getattr(result, "structuredContent", None)
    if isinstance(sc, dict):
        try:
            return json.dumps(sc)
        except Exception:
            pass
    return "\n".join(
        getattr(b, "text", "") for b in (getattr(result, "content", None) or [])
    )


def _is_error(result) -> bool:
    return bool(getattr(result, "isError", False))


_META_KEYS = {"tool", "offset", "limit", "count", "total", "nextOffset", "truncated"}

def _parse_list_response(text: str) -> Tuple[Dict[str, str], List[Dict[str, str]]]:
    metadata: Dict[str, str] = {}
    table_lines: List[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("---"):
            continue
        key, sep, val = line.partition(":")
        if sep and key.strip() in _META_KEYS:
            metadata[key.strip()] = val.strip().strip('"')
            continue
        if line.startswith("|"):
            table_lines.append(line)
    if len(table_lines) < 2:
        return metadata, []
    headers = [c.strip() for c in table_lines[0].strip("|").split("|")]
    data_start = 1
    if not table_lines[1].strip("| ").replace("-", "").replace(":", "").strip():
        data_start = 2
    rows = []
    for line in table_lines[data_start:]:
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) == len(headers):
            rows.append(dict(zip(headers, cells)))
    return metadata, rows


async def _list_functions(session: ClientSession) -> List[Dict[str, str]]:
    all_rows: List[Dict[str, str]] = []
    offset = 0
    while True:
        if MAX_FUNCTIONS is not None and len(all_rows) >= MAX_FUNCTIONS:
            break
        try:
            result = await session.call_tool(
                LIST_FUNCTIONS_TOOL, {"offset": offset, "limit": PAGE_SIZE}
            )
        except Exception as e:
            if offset == 0:
                raise
            logger.warning(f"bn_function_list failed at offset {offset}: {e}")
            break
        if _is_error(result):
            logger.error(f"list error: {_result_text(result)[:200]}")
            break
        meta, rows = _parse_list_response(_result_text(result))
        logger.info(
            f"page offset={meta.get('offset', offset)} "
            f"count={meta.get('count', len(rows))} total={meta.get('total', '?')}"
        )
        if not rows:
            break
        all_rows.extend(rows)
        if meta.get("truncated", "false").lower() != "true":
            break
        try:
            offset = int(meta.get("nextOffset", ""))
        except ValueError:
            break
    if MAX_FUNCTIONS is not None:
        all_rows = all_rows[:MAX_FUNCTIONS]
    return all_rows


async def _try_tool(session: ClientSession, tool: str, func_id: str) -> Optional[str]:
    for param in ("function", "name", "address", "identifier", "function_name"):
        try:
            result = await session.call_tool(tool, {param: func_id})
        except Exception:
            continue
        if _is_error(result):
            continue
        text = _result_text(result)
        if text and text.strip():
            return text
    return None


# ---------------------------------------------------------------------------
# Skip-list
# ---------------------------------------------------------------------------
def _looks_trivial(row: Dict[str, str]) -> bool:
    if not SKIP_TRIVIAL:
        return False
    name = (row.get("name") or "").strip()
    if not name:
        return False
    try:
        bb = int(row.get("basicBlockCount") or "0")
        if bb == 1 and name.startswith(("sub_", "j_", "thunk_", "imp.")):
            return True
    except ValueError:
        pass
    return bool(TRIVIAL_NAME_RE.match(name))


# ---------------------------------------------------------------------------
# Filename helpers
# ---------------------------------------------------------------------------
_SAFE_RE = re.compile(r"[^A-Za-z0-9._-]+")

def _sanitize_name(name: str, max_len: int = 80) -> str:
    name = (name or "").strip()
    if not name:
        return "unnamed"
    name = _SAFE_RE.sub("_", name)
    name = name.strip("._-") or "unnamed"
    return name[:max_len]


def _parse_address(addr: str) -> Optional[int]:
    if not addr:
        return None
    s = addr.strip().lower()
    try:
        if s.startswith("0x"):
            return int(s, 16)
        return int(s, 0)
    except ValueError:
        return None


def _build_filename(row: Dict[str, str], func_id: str, ext: str) -> str:
    addr_str = row.get("lowestAddress") or ""
    addr_int = _parse_address(addr_str)
    if addr_int is not None:
        prefix = f"0x{addr_int:016x}"
    else:
        prefix = "0x" + _sanitize_name(str(func_id), 32)

    name = row.get("name") or str(func_id)
    safe = _sanitize_name(name)
    return f"{prefix}__{safe}.{ext}"


# ---------------------------------------------------------------------------
# Resume / index
# ---------------------------------------------------------------------------
def _load_already_done() -> set:
    done = set()
    if not os.path.exists(JSONL_PATH):
        return done
    with open(JSONL_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except Exception:
                continue
            key = obj.get("id")
            if key:
                done.add(key)
    logger.info(f"Resume: {len(done)} functions already in {JSONL_PATH}")
    return done


def _load_index() -> Dict[str, Any]:
    if os.path.exists(INDEX_PATH):
        try:
            with open(INDEX_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"index.json unreadable ({e}), starting fresh")
    return {}


def _save_index(index: Dict[str, Any]) -> None:
    tmp = INDEX_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(index, f, indent=2)
    os.replace(tmp, INDEX_PATH)


# ---------------------------------------------------------------------------
# Per-function writer
# ---------------------------------------------------------------------------
def _write_function_file(row: Dict[str, str], func_id: str,
                         body: str, kind: str) -> str:
    """kind in {'pseudocode', 'disassembly', 'no_output'}; returns relative path."""
    ext = "c" if kind == "pseudocode" else "asm"
    filename = _build_filename(row, func_id, ext)
    full_path = os.path.join(OUTPUT_DIR, filename)

    header = [
        f"/*",
        f" * id:       {func_id}",
        f" * name:     {row.get('name', '')}",
        f" * arch:     {row.get('arch', '')}",
        f" * platform: {row.get('platform', '')}",
        f" * address:  {row.get('lowestAddress', '')}-{row.get('highestAddress', '')}",
        f" * exported: {row.get('exported', '')}",
        f" * kind:     {kind}",
        f" */",
        "",
    ]
    with open(full_path, "w", encoding="utf-8", errors="replace") as f:
        f.write("\n".join(header))
        f.write(body)
        if not body.endswith("\n"):
            f.write("\n")
    return filename


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
async def extract():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    already = _load_already_done()
    index = _load_index()
    jsonl_fh = open(JSONL_PATH, "a", encoding="utf-8")

    http_client = httpx.AsyncClient(
        headers={"Authorization": f"Bearer {HTTP_TOKEN}"} if HTTP_TOKEN else {},
        timeout=httpx.Timeout(120.0, connect=30.0),
    )
    try:
        async with streamable_http_client(url=HTTP_URL, http_client=http_client) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()

                logger.info("Listing functions...")
                functions = await _list_functions(session)
                logger.info(f"Total rows to consider: {len(functions)}")

                todo = []
                for row in functions:
                    func_id = row.get("function") or row.get("name") or row.get("lowestAddress")
                    if not func_id or func_id in already:
                        continue
                    if _looks_trivial(row):
                        continue
                    todo.append((func_id, row))

                logger.info(
                    f"Will process {len(todo)} new functions "
                    f"(skipped {len(functions) - len(todo)}: already done or trivial)"
                )

                for i, (func_id, row) in enumerate(todo, 1):
                    record: Dict[str, Any] = {
                        "id": func_id,
                        "name": row.get("name"),
                        "arch": row.get("arch"),
                        "address": row.get("lowestAddress"),
                        "highestAddress": row.get("highestAddress"),
                        "platform": row.get("platform"),
                        "exported": row.get("exported"),
                    }

                    pseudo = await _try_tool(session, DECOMPILE_TOOL, func_id)
                    if pseudo:
                        fname = _write_function_file(row, func_id, pseudo, "pseudocode")
                        record["pseudocode"] = pseudo
                        record["file"] = fname
                        record["kind"] = "pseudocode"
                    else:
                        asm = await _try_tool(session, DISASSEMBLY_TOOL, func_id)
                        if asm:
                            fname = _write_function_file(row, func_id, asm, "disassembly")
                            record["disassembly"] = asm
                            record["file"] = fname
                            record["kind"] = "disassembly"
                            record["note"] = "decompiler_failed"
                        else:
                            record["note"] = "no_output"
                            record["kind"] = "no_output"

                    # 1) append to JSONL (crash-safe)
                    jsonl_fh.write(json.dumps(record) + "\n")
                    jsonl_fh.flush()

                    # 2) update index in memory (persisted periodically)
                    index[func_id] = {
                        "name": record.get("name"),
                        "arch": record.get("arch"),
                        "address": record.get("address"),
                        "file": record.get("file"),
                        "kind": record.get("kind"),
                    }

                    # 3) persist index every 200 functions
                    if i % 200 == 0:
                        _save_index(index)
                        logger.info(f"progress: {i}/{len(todo)} (index saved)")

                    if PER_CALL_DELAY:
                        await asyncio.sleep(PER_CALL_DELAY)

                _save_index(index)
                logger.info(f"Done. {len(todo)} processed. index.json + per-fn files in {OUTPUT_DIR}/")
    finally:
        jsonl_fh.close()
        await http_client.aclose()


if __name__ == "__main__":
    asyncio.run(extract())

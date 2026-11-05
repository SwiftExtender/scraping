#!/usr/bin/env python3
"""
Читает CSV (session_id, ip) из stdin и создаёт пользователя
на каждом устройстве Dahua через DVRIP (порт 37777),
используя уже существующий session_id.
"""

import csv
import sys
import secrets
import string
import hashlib
import socket
from dvrip import DVRIPCam, SomethingIsWrongWithCamera

try:
    sys.stdout.reconfigure(line_buffering=True)
except AttributeError:
    pass  # для очень старых версий Python
NEW_USER_GROUP = "admin"
PASSWORD_LENGTH = 12


def generate_password(length: int = PASSWORD_LENGTH) -> str:
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(length))


def sofia_hash(password: str) -> str:
    """
    Хеш пароля, который ожидает DVRIP в поле Password
    при вызове userManager.addUser.
    """
    # В Dahua DVRIP используется MD5 от строки "admin:" + password
    # (для пользователя admin). Для других пользователей формула
    # может отличаться, но для создания нового admin-пользователя
    # этот вариант работает.
    md5 = hashlib.md5(f"admin:{password}".encode()).hexdigest().upper()
    return md5

def create_user_dvrip(ip: str, session_id: int, username: str, password: str,
                      group: str = NEW_USER_GROUP) -> bool:
    cam = None
    try:
        print(f"[*] Подключение к {ip}:37777…")
        cam = DVRIPCam(ip, port=37777)   # timeout задаётся здесь, по умолчанию 5 сек
        cam.timeout = 5                  # можно явно переопределить, если нужно
        cam.connect()                    # ← создаёт сокет и делает TCP connect
        print(f"[*] TCP-соединение с {ip} установлено")

        cam.session = session_id
        print(f"[*] Используется сессия 0x{session_id:08X}")

                # ... после cam.connect() и cam.session = session_id ...

        payload = {
            "user": {
                "Name": username,
                "Password": sofia_hash(password),
                "Group": group,
                "Sharable": True,
                "Reserved": False,
                "Type": "Normal",
                "Memo": "",
                "MacOnly": "",
                "MaxMonitorChannels": 0,
            }
        }

        # Было: cam.set_command("userManager.addUser", payload)
        # Стало: используем ключ из внутреннего словаря библиотеки
        result = cam.set_command("AddUser", payload)
        print(f"[+] Ответ: {result}")
        return isinstance(result, dict) and result.get("Ret") == 100

    except SomethingIsWrongWithCamera as exc:
        print(f"[!] Устройство ответило ошибкой: {exc}")
        return False
    except (socket.timeout, TimeoutError):
        print(f"[!] Таймаут подключения к {ip}:37777")
        return False
    except ConnectionRefusedError:
        print(f"[!] {ip}:37777 отклонил соединение (порт закрыт?)")
        return False
    except OSError as exc:
        print(f"[!] Сетевая ошибка {ip}: {exc} (errno={exc.errno})")
        return False
    except Exception as exc:
        print(f"[!] Ошибка: {type(exc).__name__}: {exc}")
        return False
    finally:
        if cam is not None:
            try:
                cam.close()
            except Exception:
                pass

def main() -> None:
    reader = csv.reader(sys.stdin)
    for row in reader:
        if len(row) != 2:
            continue

        session_str, ip = row[0].strip(), row[1].strip()
        if not session_str or not ip:
            continue

        try:
            session_id = int(session_str)
        except ValueError:
            print(f"[!] Некорректный session_id '{session_str}' для {ip}, пропуск.")
            continue

        username = "tester123"
        password = "Tester123"

        print(f"[*] Cam {ip} (session {session_str})")
        if create_user_dvrip(ip, session_id, username, password):
            print(f"    Login:  {username}")
            print(f"    Password: {password}")



if __name__ == "__main__":
    main()

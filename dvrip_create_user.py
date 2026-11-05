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
from dvrip import DVRIPCam   # pip install python-dvr

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


def create_user_dvrip(
    ip: str,
    session_id: int,
    username: str,
    password: str,
    group: str = NEW_USER_GROUP,
) -> bool:
    """
    Подключается к устройству по DVRIP, «подставляет» готовый session_id
    и вызывает RPC-команду userManager.addUser.
    """
    try:
        cam = DVRIPCam(ip, port=37777)
        # Ключевой момент: используем уже существующую сессию,
        # не выполняя повторный login().
        cam.session = session_id
        print(f"[*] Используется DVRIP-сессия 0x{session_id:08X} для {ip}")

        # Формируем полезную нагрузку точно в таком виде,
        # который ожидает Dahua (см. пример для DahuaConsole).
        auth_hash = sofia_hash(password)
        payload = {
            "user": {
                "Name": username,
                "Password": auth_hash,
                "Group": group,
                "Sharable": True,
                "Reserved": False,
                "Type": "Normal",
                "Memo": "",
                "MacOnly": "",
                "MaxMonitorChannels": 0,
            }
        }

        # Отправляем RPC-команду через низкоуровневый метод set_command.
        # В библиотеке python-dvr он используется для произвольных
        # RPC-вызовов (пример с OPFeedBook в README).
        result = cam.set_command("userManager.addUser", payload)
        print(f"[+] Ответ устройства: {result}")

        # В успешном ответе обычно присутствует Ret = 100.
        if isinstance(result, dict) and result.get("Ret") == 100:
            print(f"[+] Пользователь '{username}' успешно создан на {ip}")
            return True
        else:
            print(f"[!] Устройство вернуло неожиданный ответ: {result}")
            return False

    except Exception as exc:
        print("Connection error")
        return False
    finally:
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

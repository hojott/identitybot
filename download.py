import os, sys
from dotenv import load_dotenv
from telethon.sync import TelegramClient

load_dotenv()

if len(sys.argv) > 1 and sys.argv[1] == "--chat-id":
    chat_id = sys.argv[2]
else:
    chat_id = input("ChatId: ")

try:
    chat_id = int(chat_id)
    chat_id += -1000000000000
except ValueError:
    pass
api_id = int(os.getenv("DOWNLOAD_API_ID", ""))
api_hash = os.getenv("DOWNLOAD_API_HASH", "")
user = os.getenv("TARGET_USER", "")

client = TelegramClient('session_id', api_id, api_hash)

with client:
    for msg in client.iter_messages(chat_id, from_user=user):
        print(f"\"{msg.text}\",")

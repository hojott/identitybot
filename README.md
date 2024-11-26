# It's not what it looks like

## Installation - bot/webserver
- `echo "
  CHAT_ID=-1001989531859 or whatever
  IDENTITY_BOT_TOKEN=5109850:AAFJALjfajaA935qfal_AFafkajGN or whatever
" > .env`
- `cp database.json.example /data/database.json`
- `npm install`
- `node bot.js`

## Installation - downloader
- `echo "
  DOWNLOAD_API_ID=5162905 or whatever
  DOWNLOAD_API_HASH=51751ae48109fd41b5151c515b51 or whatever
  TARGET_USER=@BotFather or whatever
" > .env`
- `poetry install`
- `poetry run python download.py` (`>> /data/database.json`)


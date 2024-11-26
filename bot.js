const fs = require('fs')
const database = JSON.parse(fs.readFileSync("/data/database.json"))

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const token = process.env.IDENTITY_BOT_TOKEN;
const bot = new TelegramBot(token);
const chatId = process.env.CHAT_ID;

const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.post("/submit", async (req, res) => {
  const { textbox, action } = req.body;
  let ogMsg;
  let soriMsg;

  if (action === 'text') {
    if (textbox === "") {return}
    console.log("Sending message: ", textbox)
    ogMsg = await bot.sendMessage(chatId, textbox);
  } else if (action === 'random') {
    console.log("Sending random message...")
    let message = "";
    while (message === "") {
      let i = Math.floor(Math.random() * (database["messages"].length + 1));
      message = database["messages"][i];
    }
    console.log("  Selected message: ", message)
    ogMsg = await bot.sendMessage(chatId, message);
  } else {
    console.log("Incorrect action!")
    ogMsg = await bot.sendMessage(chatId, "mahjong?");
  }

  setTimeout(async () => {
    soriMsg = await bot.sendMessage(chatId, "Sori väärä ryhmä");
  }, 2000);

  setTimeout(async () => {
    try	{
      await bot.deleteMessages(chatId, [ogMsg.message_id, soriMsg.message_id]);
    } catch(err) {
      console.log(err);
      setTimeout(async () => {
        await bot.deleteMessages(chatId, [ogMsg.message_id, soriMsg.message_id]);
      }, 5000);
    }
  }, 3000);

  res.redirect("/")
})


app.listen(port, () => {
  console.log(`Identity theft listening on port ${port}`)
})


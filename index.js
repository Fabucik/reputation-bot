const Discord = require("discord.js");
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({intents: allIntents});
require("dotenv").config()

TOKEN = process.env.TOKEN

client.on("ready", () => {
    console.log("Ready!")
})

client.login(TOKEN);
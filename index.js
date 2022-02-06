const Discord = require("discord.js");
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({intents: allIntents});

const db = require("./db");

require("dotenv").config();

TOKEN = process.env.TOKEN;

client.on("ready", () => {
    console.log("Ready!");
})

client.on("messageCreate", async (mes) => {
    if (mes.content.startsWith("addme")) {
        if (await db.doesUserExist(mes.author.id) != null) {
            await mes.channel.send("You are already in database!");
            return;
        } else {
            await db.createUser(mes.author.id, 1000);
            await mes.channel.send("Succesfully added to database");
        }
    }
})

client.login(TOKEN);
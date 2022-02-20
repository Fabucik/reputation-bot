const Discord = require("discord.js");
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({intents: allIntents});

const db = require("./db");
let prefix;

require("dotenv").config();

TOKEN = process.env.TOKEN;

client.on("ready", () => {
    console.log("Ready!");
})

client.on("messageCreate", async (mes) => {
    if (mes.author.id == client.user.id) {
        return;
    }
    prefix = await db.getPrefix(client.user.id);

    if (mes.content.startsWith(`${prefix}addme`)) {
        if (await db.getUser(mes.author.id) != null) {
            await mes.channel.send("You are already in database!");
            return;
        } else {
            await db.createUser(mes.author.id, 1000);
            await mes.channel.send("Succesfully added to database");
        }
    }

    if (mes.content.startsWith(`${prefix}giverep`)) {
        userid = mes.content.split(/ /)[1];
        if (await db.getUser(userid) == null || await db.getUser(mes.author.id) == null) {
            await mes.channel.send(`Either you or other member must first use ${prefix}addme command to be added to database`);
            return
        }
        if (userid == mes.author.id) {
            await mes.channel.send("You can't give yourself points");
            return;
        }

        await db.updateUserReps(userid, 5);
        await db.updateUserTime(mes.author.id, Date.now())
    }
})

client.login(TOKEN);
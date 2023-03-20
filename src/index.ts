import { Client, Message } from "revolt.js"

import * as dotenv from "dotenv";

dotenv.config();

const revolt = new Client();

const config = {
    prefix: "?"
}

revolt.on("ready", () => {
    console.log("I am alive!\nWell... Not really.\nBut I am still ready!")
})

revolt.on("message", async (message: Message) => {
    if (!message.content?.startsWith(config.prefix) || message.author?.bot) return;

    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/);

    const command = args.shift()?.toLowerCase();

    switch (command) {
        case "ping":
            const message_ping = Date.now() - message.createdAt;
            message.reply(`Pong!\nI took ${message_ping}ms to reply!`)
            break;
        
        default: 
            message.reply("That is not a valid command ;w;")
            break;
    }
})

if (process.env.TOKEN) {
    revolt.loginBot(process.env.TOKEN);
} else {
    console.error("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nNO TOKEN\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n\nAdd TOKEN=insert_token_here to your .env file before running!!!");
    process.exit(1);
}
import { Client, GatewayIntentBits } from 'discord.js'

import { onMessageCreate } from './handlers/messageCreate'

const bot = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

bot.on('messageCreate', onMessageCreate)

export { bot }

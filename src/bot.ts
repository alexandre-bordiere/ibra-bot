import { Client, Intents } from 'discord.js'

import {
  findOrCreatePocebloEmoji,
  resolveCommand,
  shouldReactWithPoceBloEmoji,
} from './utils'

const bot = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
})

bot.on('messageCreate', async message => {
  if (!message?.guild) {
    return
  }

  resolveCommand(message)

  if (shouldReactWithPoceBloEmoji()) {
    message.react(await findOrCreatePocebloEmoji(message.guild))
  }
})

// Destroy the client "properly" when the process is being terminated.
process.on('exit', () => bot.destroy())
process.on('SIGINT', () => process.exit())

export default bot

import process from 'node:process'
import { config } from 'dotenv'

import { bot } from './bot'

config()

bot.login(process.env.TOKEN)

// Destroy the client properly when the process is being terminated.
process.on('exit', () => {
  bot.destroy()
})
process.on('SIGINT', () => {
  process.exit()
})

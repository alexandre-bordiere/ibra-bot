import { config } from 'dotenv'

import bot from './bot'

config()

bot.login(process.env.TOKEN)

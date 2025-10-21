import type { Message } from 'discord.js'

import type { Command } from '../types'
import { commands } from '../constants'

export function executeCommand(command: Command, message: Message) {
  if (!message.member?.voice.channel)
    return message.member?.user.send('Vous devez être dans un salon vocal pour pouvoir effectuer cette action.')

  return command.exec(message.member.user, message.member.voice.channel)
}

export function resolveCommand(message: Message) {
  return commands.find(c => c.signature === message.content.trim())
}

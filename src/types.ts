import type { User, VoiceBasedChannel } from 'discord.js'

export enum CommandType {
  AUDIO = 'audio',
  TEXT = 'text',
}

export interface Command {
  signature: string
  type: CommandType
  description: string
  exec: (user: User, voiceChannel: VoiceBasedChannel) => Promise<unknown>
}

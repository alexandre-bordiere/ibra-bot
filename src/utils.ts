import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'
import { Guild, Message, VoiceBasedChannel } from 'discord.js'
import * as path from 'path'

import commands from './commands'

function getAssetsPath(file: string) {
  return path.join(__dirname, '..', 'assets', file)
}

export async function findOrCreatePocebloEmoji(server: Guild) {
  const pocebloEmoji = server.emojis.cache.find(e => e.name === 'poceblo')

  if (pocebloEmoji) {
    return pocebloEmoji
  }

  return server.emojis.create(getAssetsPath('/images/poceblo.png'), 'poceblo')
}

export async function playFile(voiceChannel: VoiceBasedChannel, file: string) {
  const connection = joinVoiceChannel({
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    channelId: voiceChannel.id,
    guildId: voiceChannel.guildId,
  })

  return connection.subscribe(
    tap(createAudioPlayer(), audioPlayer => {
      audioPlayer.play(createAudioResource(getAssetsPath(`sounds/${file}`)))

      audioPlayer.on(AudioPlayerStatus.Idle, () => {
        connection.destroy()
      })
    })
  )
}

export function resolveCommand(message: Message) {
  const command = commands.find(c => c.signature === message.content.trim())

  if (!command) {
    return
  }

  if (!message.member?.voice.channel) {
    message.member?.user.send(
      'Vous devez être dans un salon vocal pour pouvoir effectuer cette action.'
    )

    return
  }

  command.exec(message.member.user, message.member.voice.channel)
}

export function shouldReactWithPoceBloEmoji() {
  const max = 6

  return Math.floor(Math.random() * max + 1) === 1
}

function tap<T>(value: T, callback: (value: T) => void) {
  callback(value)

  return value
}

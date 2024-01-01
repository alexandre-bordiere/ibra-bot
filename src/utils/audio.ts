import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice'
import { VoiceBasedChannel } from 'discord.js'

import { getAssetPath, tap } from './misc'

export function playFile(voiceChannel: VoiceBasedChannel, file: string) {
  const connection = joinVoiceChannel({
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    channelId: voiceChannel.id,
    guildId: voiceChannel.guildId,
  })

  return connection.subscribe(
    tap(createAudioPlayer(), audioPlayer => {
      audioPlayer.play(createAudioResource(getAssetPath(`sounds/${file}`)))

      audioPlayer.on(AudioPlayerStatus.Idle, () => {
        connection.destroy()
      })
    })
  )
}

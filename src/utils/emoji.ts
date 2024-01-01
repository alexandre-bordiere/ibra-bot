import type { Guild } from 'discord.js'

import { getAssetPath } from '../utils/misc'

export async function findOrCreatePocebloEmoji(server: Guild) {
  let pocebloEmoji = server.emojis.cache.find(e => e.name === 'poceblo')

  if (!pocebloEmoji) {
    pocebloEmoji = await server.emojis.create({
      attachment: getAssetPath('/images/poceblo.png'),
      name: 'poceblo',
    })
  }

  return pocebloEmoji
}

export function shouldReactWithPoceBloEmoji() {
  const max = 6

  return Math.floor(Math.random() * max + 1) === 1
}

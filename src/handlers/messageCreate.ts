import type { Message } from 'discord.js'

import { executeCommand, resolveCommand } from '../utils/commands'
import { findOrCreatePocebloEmoji, shouldReactWithPoceBloEmoji } from '../utils/emoji'

export async function onMessageCreate(message: Message) {
  if (!message.guild)
    return

  const command = resolveCommand(message)

  if (!command)
    return

  await executeCommand(command, message)

  // We want to react with the "poceblo" emoji with a 1/6 probability.
  if (shouldReactWithPoceBloEmoji()) {
    const poceBloEmoji = await findOrCreatePocebloEmoji(message.guild)

    await message.react(poceBloEmoji)
  }
}

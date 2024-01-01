import * as path from 'node:path'

export function getAssetPath(file: string) {
  return path.join(__dirname, '..', 'assets', file)
}

export function tap<T>(value: T, callback: (value: T) => void) {
  callback(value)

  return value
}

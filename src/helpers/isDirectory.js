import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'

export default async function isDirectory(path) {
  try {
    const stats = await stat(resolve(path))
    return stats.isDirectory()
  }
  catch (error) {
    return false
  }
}

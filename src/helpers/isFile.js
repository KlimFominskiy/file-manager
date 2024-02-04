import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'

export default async function isFile(path) {
  try {
    const stats = await stat(resolve(path))
    return stats.isFile()
  }
  catch (error) {
    return false
  }
}

import { unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleRm([pathToFile]) {
  try {
    await unlink(resolve(pathToFile))
    displayCurrentDirectory()
  }
  catch (error) {
    console.error('Operation failed')
  }
}

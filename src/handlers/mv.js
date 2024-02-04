import { createReadStream, createWriteStream } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'

export default async function handleMv([pathToFile, pathToNewDirectory]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToNewDirectory))

    if (isNotDirectory) throw new Error('invalid path_to_new_directory')

    const { base } = parse(resolve(pathToFile))
    const readableStream = createReadStream(resolve(pathToFile))
    const writableStream = createWriteStream(resolve(pathToNewDirectory, base))
    await pipeline(readableStream, writableStream)
    await unlink(resolve(pathToFile))
    displayCurrentDirectory()
  }
  catch (error) {
    console.error('Operation failed')
  }
}

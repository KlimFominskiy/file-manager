import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleCp([pathToFile, pathToNewDirectory]) {
  try {
    const { base } = parse(resolve(pathToFile))
    pathToNewDirectory = resolve(pathToNewDirectory, base)
    const readableStream = createReadStream(resolve(pathToFile))
    const writableStream = createWriteStream(pathToNewDirectory)
    await pipeline(readableStream, writableStream)
    displayCurrentDirectory()
  } catch (error) {
    console.error('Operation failed')
  }
}

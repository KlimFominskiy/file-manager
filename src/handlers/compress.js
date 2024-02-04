import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress } from 'node:zlib'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'
import isFile from '../helpers/isFile.js'

export default async function handleCompress([pathToFile, pathToDestination]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination))
    const isNotFile = !(await isFile(pathToFile))

    if (isNotDirectory) throw new Error("it's not a directory")
    if (isNotFile) throw new Error("it's not a file")

    const { base } = parse(resolve(pathToFile))
    const fileName = `${base}.br`

    const readableStream = createReadStream(resolve(pathToFile))
    const writableStream = createWriteStream(resolve(pathToDestination, fileName))
    const brotliCompress = createBrotliCompress()
    await pipeline(readableStream, brotliCompress, writableStream)
    displayCurrentDirectory()
  } catch (error) {
    console.error('Operation failed')
  }
}

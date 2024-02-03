import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress } from 'node:zlib'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'
import isFile from '../helpers/isFile.js'

export default async function handleDecompress([
  pathToFile,
  pathToDestination,
]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination))
    const isNotFile = !(await isFile(pathToFile))

    if (isNotDirectory) throw new Error("it's not a directory")
    if (isNotFile) throw new Error("it's not a file")

    pathToFile = resolve(pathToFile)
    const { name, ext } = parse(pathToFile)

    if (!ext.includes('.br')) throw new Error('invalid file extension')

    pathToDestination = resolve(pathToDestination, name)

    const readableStream = createReadStream(pathToFile)
    const writableStream = createWriteStream(pathToDestination)
    const brotliDecompress = createBrotliDecompress()
    await pipeline(readableStream, brotliDecompress, writableStream)
    displayCurrentDirectory()
  } catch (error) {
    console.error('Operation failed')
  }
}

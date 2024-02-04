import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress } from 'node:zlib'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'
import isFile from '../helpers/isFile.js'

export default async function handleDecompress([pathToFile,  pathToDestination,]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination))
    const isNotFile = !(await isFile(pathToFile))

    if (isNotDirectory) throw new Error("it's not a directory")
    if (isNotFile) throw new Error("it's not a file")

    const { name, ext } = parse(resolve(pathToFile))

    if (!ext.includes('.br')) throw new Error('invalid file extension')

    const readableStream = createReadStream(resolve(pathToFile))
    const writableStream = createWriteStream(resolve(pathToDestination, name))
    const brotliDecompress = createBrotliDecompress()
    await pipeline(readableStream, brotliDecompress, writableStream)
    displayCurrentDirectory()
  } catch (error) {
    console.error('Operation failed')
  }
}

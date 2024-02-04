import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import { pipeline } from 'node:stream/promises'
import { customOutput } from '../helpers/other.js'

export default async function cat([pathToFile]) {
  try {
    const readableStream = createReadStream(resolve(pathToFile), { encoding: 'utf8' })
    await pipeline(readableStream, customOutput())
    displayCurrentDirectory()
  }
  catch (error) {
    console.error('Operation failed')
  }
}

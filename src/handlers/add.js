import { open } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function add([newFileName]) {
  let fileHandle
  try {
    const pathToFile = resolve(cwd(), newFileName)
    fileHandle = await open(pathToFile, 'w')
    displayCurrentDirectory()
  }
  catch (error) {
    console.error('Operation failed')
  }
  finally {
    fileHandle?.close()
  }
}

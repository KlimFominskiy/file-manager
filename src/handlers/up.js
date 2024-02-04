import { chdir } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
export default async function up() {
  try {
    chdir('..')
    displayCurrentDirectory()
  }
  catch (error) {
    console.error('Operation failed')
  }
}

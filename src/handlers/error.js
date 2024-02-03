import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default function handleError(error) {
  if (error) {
    console.error('Operation failed')
  } else {
    displayCurrentDirectory()
  }
}

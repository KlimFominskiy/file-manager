import { dirname } from 'node:path'
import getFilename from './getFilename.js'

export default function getDirname(importMetaUrl) {
    return dirname(getFilename(importMetaUrl))
}

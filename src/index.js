import EventEmitter from 'node:events'
import { homedir } from 'node:os'
import readline from 'node:readline'
import add from './handlers/add.js'
import handleCompress from './handlers/compress.js'
import cd from './handlers/cd.js'
import handleCp from './handlers/cp.js'
import handleLs from './handlers/ls.js'
import handleDecompress from './handlers/decompress.js'
import handleLine from './handlers/line.js'
import handleHash from './handlers/hash.js'
import handleOs from './handlers/os.js'
import handleMv from './handlers/mv.js'
import handleRm from './handlers/rm.js'
import cat from './handlers/cat.js'
import rn from './handlers/rn.js'
import up from './handlers/up.js'
import displayCurrentDirectory from './helpers/displayCurrentDirectory.js'
import {
    argv,
    chdir,
    exit,
    stdin as input,
    stdout as output,
} from 'node:process'

chdir(homedir())

const args = Object.fromEntries(
    argv.slice(2).map((arg) => {
        const [key, value] = arg.split('=')
        return [key, value]
    })
)

const username = args['--username'] ? args['--username'] : 'stranger'

console.log(`Welcome to the File manager, ${username}!`)
displayCurrentDirectory()

const eventEmitter = new EventEmitter()
eventEmitter.setMaxListeners(0)

eventEmitter
    .on('up', up)
    .on('ls', handleLs)
    .on('cat', cat)
    .on('add', add)
    .on('rn', rn)
    .on('cp', handleCp)
    .on('mv', handleMv)
    .on('rm', handleRm)
    .on('hash', handleHash)
    .on('cd', cd)
    .on('os', handleOs)
    .on('compress', handleCompress)
    .on('decompress', handleDecompress)

const rl = readline.createInterface({
    input,
    output,
})

rl.on('line', handleLine.bind(rl, eventEmitter))
    .on('SIGINT', () => rl.close())
    .on('close', () => {
    console.log(`Thank you for using File Manager, ${username}! Goodbye!`)
    setTimeout(() => exit(0), 100)
    })

'use strict'

const io = require('socket.io-client')
const { join } = require('path')
const { readFile } = require('fs')
const { copy } = require('copy-paste')
const { Glob } = require('glob')

module.exports = ({ clipboard = true,
                    include = '**',
                    exclude = 'node_modules/**',
                    server = 'ws://node-together.maju.systems:4000' } = {}) => {

    const socket = io.connect(server)

    socket.on('send-session-id', id => {

        if (clipboard) {
            copy(id, err => {
                if (err) throw err
                console.log(`Session ID copied to clipboard: ${id}`)
            })
        }

        else if (!clipboard) {
            console.log(id)
        }

    })

    socket.on('error', err => {
        console.log(err)
    })

    socket.on('start-session', () => {

        const cwd = process.cwd()
        const glob = new Glob(include, { ignore: exclude, nodir: true })
        let end = false, pending = 0

        glob.on('match', name => {
            pending++
            console.log(name)
            const file = join(cwd, name)
            readFile(file, (err, data) => {
                if (err) console.log(err)
                socket.emit('file', { name, data })
                if (!--pending && end) {
                    socket.emit('stop-session')
                    socket.disconnect()
                }
            })
        })

        glob.on('error', err => {
            console.log(err)
        })

        glob.on('end', () => {
            if ((end = true) && !pending) {
                socket.emit('stop-session')
                socket.disconnect()
            }
        })

    })

    socket.emit('request-session-id')

}

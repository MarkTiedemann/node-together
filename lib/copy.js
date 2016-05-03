'use strict'

const io = require('socket.io-client')
const { copy } = require('copy-paste')
const { read } = require('glob-plus')

module.exports = ({ clipboard = true,
                    include = '**',
                    exclude = 'node_modules/**',
                    server = 'ws://node-together.maju.systems:4000' } = {}) => {

    const socket = io.connect(server, { forceNew: true })

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

        const glob = read(include, { ignore: exclude })

        glob.on('file', file => {
            console.log(file.name)
            socket.emit('file', file)
        })

        glob.on('error', err => {
            console.log(err)
        })

        glob.on('end', () => {
            socket.emit('stop-session')
            socket.disconnect()
        })

    })

    socket.emit('request-session-id')

}

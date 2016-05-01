'use strict'

const io = require('socket.io-client')
const { copy } = require('copy-paste')
const walk = require('../lib/walk')

module.exports = (match) => {

    const socket = io.connect('ws://node-together.maju.systems:4000')

    socket.on('send-session-id', id => {
        copy(id, err => {
            if (err) throw err
            console.log(`Session ID copied to clipboard: ${id}`)
        })
    })

    socket.on('start-session', () => {

        if (match.length === 0)
            match = ['*', '!node_modules']

        const walker = walk ({ dir: process.cwd(), match })

        walker.on('file', file => {
            socket.emit('file', file)
        })

        walker.on('done', () => {
            socket.emit('stop-session')
            socket.disconnect()
        })
    })

    socket.emit('request-session-id')

}

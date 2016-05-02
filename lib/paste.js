'use strict'

const io = require('socket.io-client')
const { join } = require('path')
const { outputFile } = require('fs-extra')
const { paste } = require('copy-paste')

module.exports = ({ id = false,
                    server = 'ws://node-together.maju.systems:4000' } = {}) => {

    const socket = io.connect(server, { forceNew: true })
    const cwd = process.cwd()

    socket.on('file', ({ name, data }) => {
        console.log(name)
        const file = join(cwd, name)
        outputFile(file, data, err => {
            if (err) console.log(err)
        })
    })

    socket.on('error', err => {
        console.log(err)
    })

    socket.on('stop-session', () => {
        socket.disconnect()
    })

    if (id) {
        socket.emit('start-session', id)
    }

    else if (!id) {
        paste((err, clipboard) => {
            if (err) throw err
            console.log(`Session ID copied from clipboard: ${clipboard}`)
            socket.emit('start-session', clipboard)
        })
    }

}

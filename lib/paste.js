'use strict'

const fs = require('fs')
const path = require('path')
const io = require('socket.io-client')
const mkdirp = require('mkdirp')
const { paste } = require('copy-paste')

module.exports = (id) => {

    const socket = io.connect('ws://node-together.maju.systems:4000')
    const cwd = process.cwd()

    socket.on('file', ({ name, data }) => {

        const file = path.join(cwd, name)
        const dir = path.parse(file).dir

        fs.exists(dir, exists => {

            if (exists) {
                fs.writeFile(file, data, err => {
                    if (err) throw err
                })
            }

            if (!exists) {
                mkdirp(dir, err => {
                    if (err) throw err
                    fs.writeFile(file, data, err => {
                        if (err) throw err
                    })
                })
            }
        })
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

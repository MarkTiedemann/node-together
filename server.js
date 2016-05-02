'use strict'

const io = require('socket.io')(4000)
const uuid = require('node-uuid')
const map = new Map()

io.on('connection', socket => {

    socket.on('request-session-id', () => {
        const id = uuid.v4()
        map.set(id, socket)
        socket.emit('send-session-id', id)
    })

    socket.on('error', err => {
        console.log(err)
    })

    socket.on('start-session', id => {

        const session = map.get(id)

        session.on('file', file => {
            socket.emit('file', file)
        })

        session.on('error', err => {
            console.log(err)
        })

        session.on('stop-session', () => {
            socket.emit('stop-session')
            map.delete(id)
        })

        session.emit('start-session')

    })

})

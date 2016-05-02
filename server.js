'use strict'

const io = require('socket.io')(4000)
const logger = require('winston')
const uuid = require('node-uuid')
const map = new Map()

io.on('connection', socket => {

    socket.on('request-session-id', () => {
        const id = uuid.v4()
        map.set(id, socket)
        logger.info(`new-session: ${id}`)
        socket.emit('send-session-id', id)
    })

    socket.on('error', err => {
        logger.error(err)
    })

    socket.on('start-session', id => {

        logger.info(`start-session: ${id}`)
        const session = map.get(id)

        session.on('file', file => {
            logger.info(`file: ${file.name}`)
            socket.emit('file', file)
        })

        session.on('error', err => {
            logger.error(err)
        })

        session.on('stop-session', () => {
            logger.info(`stop-session: ${id}`)
            socket.emit('stop-session')
            map.delete(id)
        })

        session.emit('start-session')

    })

})

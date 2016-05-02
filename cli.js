#!/usr/bin/env node
'use strict'

const copy = require('./lib/copy')
const paste = require('./lib/paste')

const args = require('minimist')(process.argv.slice(2), {
    alias: { 'session-id': 'id' }
})

switch (args._[0]) {

    case 'copy':
        copy(args)
        break

    case 'paste':
        paste(args)
        break

    default:
        break
}

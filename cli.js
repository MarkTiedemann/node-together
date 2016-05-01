#!/usr/bin/env node
'use strict'

const copy = require('./lib/copy')
const paste = require('./lib/paste')

const args = process.argv.slice(2)

switch (args.shift()) {

    case 'copy':
        copy(args)
        break

    case 'paste':
        paste(args.shift())
        break

    default:
        break
}

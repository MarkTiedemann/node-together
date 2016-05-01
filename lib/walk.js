'use strict'

const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')
const multimatch = require('multimatch')

module.exports = ({ dir, match } = {}) => {

    let root = dir
    let walker = new EventEmitter()

    let walkRec = (dir, done) => {

        fs.readdir(dir, (err, files) => {
            if (err) throw err

            let pending = files.length
            if (!pending) return done()

            files.forEach(file => {

                let dirFile = path.resolve(dir, file)

                fs.stat(dirFile, (err, stat) => {
                    if (err) throw err

                    if (multimatch([file], match).length === 0) {
                        if (!--pending) done()
                    }

                    else if (stat.isDirectory()) {
                        walkRec(dirFile, () => {
                            if (!--pending) done()
                        })
                    }

                    else if (stat.isFile()) {
                        fs.readFile(dirFile, (err, data) => {
                            if (err) throw err

                            let name = path.relative(root, dirFile)
                            if (path.sep !== '/')
                                name = name.split(path.sep).join('/')
                            walker.emit('file', { name, data })
                            if (!--pending) done()
                        })
                    }
                })
            })
        })
    }

    walkRec(root, () => {
        walker.emit('done')
    })

    return walker
}

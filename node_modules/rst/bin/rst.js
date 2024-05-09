#!/usr/bin/env node

var fs = require('fs')
var rst = require('../')

var size = (
  Number(process.argv[2]) *
  Math.pow(2, 10)
)

var path = process.cwd() + '/' + (process.argv[2] || '0')  + 'kb'
var file = fs.createWriteStream(path, {
  encoding: 'binary'
})

rst(size).pipe(file)

through = require 'through2'
Vinyl = require 'vinyl'
path = require 'path'
fs = require 'fs'

module.exports = (options) ->
  lastest = false
  contents = ''
  options = options or {}
  options.outputs = options.outputs or 'main.js'

  transform = (file, enc, cb) ->
    contents += """\n#{file.contents.toString()}\n"""
    lastest = file
    cb()

  flush = (cb) ->
    if lastest
      polyfill = fs.readFileSync('runtime-amd.js', 'utf8')
      contents = """\n#{polyfill}\n""" + contents
      output = lastest.clone()
      output.contents = new Buffer(contents)
      output.path = path.join(lastest.base, options.outputs)
      this.push output
    cb()
  return through(
    objectMode: true,
    transform, 
    flush
  )

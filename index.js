const split2 = require('split2')
const prettyjson = require('prettyjson')
const through2 = require('through2')
const combiner = require('stream-combiner')

const DEFAULT_OPTIONS = {
  color: true,
  separator: '\n---\n'
}

function prettyldjson (options = {}) {
  options = Object.assign(DEFAULT_OPTIONS, options)
  let pjOptions = { noColor: !options.color }
  let firstLine = true
  return combiner(
    split2(),
    through2(function(line, enc, next) {
      try {
        let result = prettyjson.render(JSON.parse(line), pjOptions)
        if (!firstLine) {
          this.push(options.separator)
        }
        this.push(result)
        firstLine = false
      } catch (_) { }
      next()
    })
  )
}

module.exports = prettyldjson

var stream = require('stream')
var util = require('util')

var random = function(set) {
  return set[~~(Math.random() * set.length)]
}

var alphanumeric = (function() {
  var character = []
  for (var i = 48; i <= 57; i++) {
    character.push(i)
  }
  for (var i = 65; i <= 90; i++) {
    character.push(i)
  }
  for (var i = 97; i <= 122; i++) {
    character.push(i)
  }
  return character
})()

var rst = function(length, type) {
  if (!(this instanceof rst)) {
    return new rst(length)
  }
  stream.Readable.call(this)
  this.length = length
}

util.inherits(rst, stream.Readable)

rst.prototype._read = function() {
  if (this.length--) {
    return this.push(
      String.fromCharCode(
        random(alphanumeric)
      )
    )
  }
  this.push(null)
}

module.exports = rst

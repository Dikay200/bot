var run = require('tape').test
var concat = require('concat-stream')
var rst = require('../')

run('it works', function(test) {
  var size = Math.pow(2, 14)
  rst(size)
    .pipe(concat(function(string) {
      test.equal(string.length, size)
      test.end()
    }))   
})

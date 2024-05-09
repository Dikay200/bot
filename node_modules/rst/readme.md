# rst
rst is a readable stream that produces a random alphanumeric string of a given size (in kilobytes). It includes a command-line utility that will create a file from the output, sort of like `dd`. 

[![Build status](https://travis-ci.org/michaelrhodes/rst.png?branch=master)](https://travis-ci.org/michaelrhodes/rst)

## Install
``` sh
$ npm install rst
# or
$ npm install -g rst
```

### Example
``` js
var rst = require('rst')

rst(350).pipe(process.stdout)
=> wa9rjdfASDJFa09sdjfAW3F…
```

### CLI Example
``` sh
$ rst 350
$ ls
some-file.txt
350kb
song.mp3
```

### License
[MIT](http://opensource.org/licenses/MIT)

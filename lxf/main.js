'use strict'

const $stat = require('./fs/stat.js')

$stat('./server.js').then(res => {
  console.log(res)
})

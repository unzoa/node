'use strict'

const fs = require('fs')

let d = 'hello, \nNodeJs'

fs.writeFile('./public/output/asynchronous.txt', d, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Done!')
  }
})

// 同步 synchronize
fs.writeFileSync('./public/output/synchronize.txt', d)

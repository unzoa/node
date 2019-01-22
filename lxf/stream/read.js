'use strict'

const fs = require('fs')

// option utf-8 不加返回的是Buffer
let rs = fs.createReadStream('./stream/file-test/output1.txt', 'utf-8')

rs.on('data', (e) => { console.log(e) }) // 同 readFile
rs.on('end', () => { console.log('end') })
rs.on('error', (e) => { console.log(e) })

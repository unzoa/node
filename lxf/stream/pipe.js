'use strict'

const fs = require('fs')

let rs = fs.createReadStream('./stream/file-test/output1.txt', 'utf-8')
let ws = fs.createWriteStream('./stream/file-test/copied.txt')

rs.on('data', (e) => {
  e.split('').forEach((i, j) => {
    ws.write(`${j}-${i}\n`)
  })
  ws.write('--END--\n')
  // ws.end() // Error: write after end
})

// 将rs流添加到了ws
rs.pipe(ws)

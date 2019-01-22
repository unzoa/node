'use strict'

const fs = require('fs')

// 建立文件夹
// 文件夹内添加花名册
fs.mkdir('./stream/register', () => {
  console.log('Buile folder success.')

  for (var k = 0; k < 10; k++) {
    let ws = fs.createWriteStream(`./stream/register/name ${k+1}.txt`, 'utf-8')
    ws.write(`name ${k+1}`)
    ws.end()
  }

})
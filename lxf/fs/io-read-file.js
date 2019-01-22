'use strict'

const fs = require('fs')

// 异步读取
let asynchronous = () => {
  fs.readFile('./img/logo.png', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data.length + 'btyes')
      console.log(data.length / (1024 * 1024) + 'M')
      console.log(data.toString('utf-8'))
    }
  })
}
// asynchronous()

// 同步读取
// try {
//   console.log(fs.readFileSync('./img/logo.png', 'utf-8').length)
// } catch (err) {
//   console.log('err', err)
// }

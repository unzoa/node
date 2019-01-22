'use strit'

const fs = require('fs')

// 获取目标的，各种文件信息
module.exports = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

// console.log('synchronize', fs.statSync('./img'))
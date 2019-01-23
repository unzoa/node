'use strict'

// const $stat = require('./fs/stat.js')
// $stat('./main.js').then(res => {
//   console.log(res)
// })

const $crypto = require('./crypto/aes.js')
console.log($crypto.aesEncrypt('aes-128-ecb', 'key', 'hahlkah'))
// console.log($crypto.aesDecrypt('aes-128-ecb', 'key', 'a419e6a9bc1c8b7a969d429099e9fbdb'))

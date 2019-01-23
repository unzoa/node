'use strict'

const c = require('crypto')

// AES 是一种常见的**对称加密算法**
module.exports = {
  // 加密
  aesEncrypt: (type, key, val, outType) => {
    let cipher = c.createCipher(type, key)
    let cip = cipher.update(val, 'utf8', outType || 'hex')
    cip += cipher.final(outType || 'hex')
    return cip
  },
  // 解密
  aesDecrypt: (type, key, val, outType) => {
    let decipher = c.createDecipher(type, key)
    let dec = decipher.update(val, outType || 'hex', 'utf8')
    try {
      dec += decipher.final('utf8')
    } catch (err) {
      dec = 'Error: yours value is wrong.'
    }
    return dec
  }
}
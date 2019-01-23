'use strict'

const crypto = require('crypto')

// 哈希算法
module.exports = (type, val) => {
  return crypto
    .createHash(type)
    .update(val)
    .digest('hex')
}
'use strict'

const c = require('crypto')

// 用随机数“增强”的哈希算法
module.exports = (type, val, secret) => {
  return c
    .createHmac(type, secret)
    .update(val)
    .digest('hex')
}
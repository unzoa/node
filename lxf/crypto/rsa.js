'use strict'

/*

  # RSA算法是一种非对称加密算法
  - 即由一个私钥和一个公钥构成的密钥对
  - 通过私钥加密，公钥解密
  - 或者通过公钥加密，私钥解密
  - 其中，公钥可以公开，私钥必须保密。

  ## s-私钥 g-公钥
  - Front -f-s- > -f-g- Back **不可行**
  - Front -b-g- <-> -b-s- Back

  ## 步骤
  - 准备RSA密钥对
    + openssl genrsa -aes256 -out rsa-key.pem 2048
      * Enter pass phrase for rsa-key.pem: test
        - 用来加密RSA密钥
        - 加密方式指定为AES256
        - 生成的RSA的密钥长度是2048位
      * 得到**原始公钥**rsa-key.pem
    + 通过rsa-key.pem加密文件导出**原始私钥**
      * openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
      * Enter pass phrase for rsa-key.pem: test
      * 得到rsa-prv.pem
    + 公钥 openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
    + 编码格式均为PEM
  
  **如果我们把message字符串的长度增加到很长，
  例如1M，这时，执行RSA加密会得到一个类似这样的错误：
  data too large for key size，
  这是因为RSA加密的原始信息必须小于Key的长度。
  那如何用RSA加密一个很长的消息呢？
  实际上，RSA并不适合加密大数据，
  而是先生成一个随机的AES密码，
  用AES加密原始信息，然后用RSA加密AES口令，
  这样，实际使用RSA时，给对方传的密文分两部分，
  一部分是AES加密的密文，
  另一部分是RSA加密的AES口令。
  对方用RSA先解密出AES口令，
  再用AES解密密文，即可获得明文。**

  # 证书
  crypto模块也可以处理数字证书。
  数字证书通常用在SSL连接，
  也就是Web的https连接。
  一般情况下，
  https连接只需要处理服务器端的单向认证，
  如无特殊需求
  （例如自己作为Root给客户发认证证书），
  建议用反向代理服务器如Nginx等Web服务器去处理证书。
*/

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const resolve = (name) => {
  return path.resolve(
    __dirname,
    name
  )
}

const readKey = (name) => {
  return fs.readFileSync(
    name,
    'utf-8'
  )
}

let prvKey = readKey(
  resolve('rsa-prv.pem')
)
let pubKey = readKey(
  resolve('rsa-pub.pem')
)
let msg = 'Hello World!'

// 使用privateKey加密
let enc_by_prv = crypto
  .privateEncrypt(
    prvKey,
    Buffer(msg, 'utf-8')
  )
console.log(enc_by_prv.toString('hex'))
// publicKey 解密
let dec_by_pub = crypto
  .publicDecrypt(
    pubKey,
    enc_by_prv // must be Buffer
  )
  .toString('utf-8')
console.log(dec_by_pub)

// publicKey 加密
let enc_by_pub = crypto
  .publicEncrypt(
    pubKey,
    Buffer.from(
      msg,
      'utf-8'
    )
  )
console.log(enc_by_pub.toString('hex'))
// privateKey 解密
let dec_by_prv = crypto
  .privateDecrypt(
    prvKey,
    enc_by_pub
  )
  .toString('utf-8')
console.log(dec_by_prv)

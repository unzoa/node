'use strict'

// 文件服务器
const fs = require('fs')
const url = require('url') // 解析URL
const path = require('path') // 处理本地文件
const http = require('http')

// **测试**
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'))
// Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: 'user:pass',
//   host: 'host.com:8080',
//   port: '8080',
//   hostname: 'host.com',
//   hash: '#hash',
//   search: '?query=string',
//   query: 'query=string',
//   pathname: '/path/to/file',
//   path: '/path/to/file?query=string',
//   href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash' }

// 解析当前目录
// let workDir = path.resolve('.')
// 组合完整的问价路径 当前目录 + + +
// let filePath = path.join(workDir, 'pub', 'index.html')

// **练习**
const root = path.resolve(process.argv[2] || '.')

// 创建文件服务器
let server = http.createServer((req, rep) => {
  // 获取url的path
  let pathname = url.parse(req.url).pathname
  // 获取对应的本地文件路径
  let filepath = path.join(root, pathname)
  fs.stat(filepath, (err, d) => {
    if (!err && d.isFile()) {
      // 未出错，并且是文件
      console.log('200' + req.url)
      // 发送200响应
      rep.writeHead(200)
      // 将文件流导向rep
      fs.createReadStream(filepath).pipe(rep)
    } else {
      // 报错 或者文件不存在
      console.log('404 ' + req.url)
      // 发送响应
      rep.writeHead(404)
      rep.end('404 Not Found')
    }
  })
}).listen(1992)

'use strict'

const http = require('http')

// 创建http server， 并传回掉函数
let server = http.createServer((req, rep) => {
  // 每次请求都会触发这里
  console.log(req.method + ': ' + req.url)

  rep.writeHead(200, {
    ContentType: 'text/html'
  })
  rep.end('<h1>Hello, NodeJs</h1>')

}).listen(1992)
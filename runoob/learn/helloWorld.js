// 载入http模块
var http = require('http')

// 创建服务器
http.createServer((req, res) => {
  // 发送HTTP头部
  // HTTP状态值 200
  // 内容类型：text/plain
  res.writeHead(200, {'Content-Type': 'text/plain'})

  // 发送响应数据“hello world”
  res.end('hello world\n')
}).listen(8888)

// 终端打印信息
console.log('Server running at http://localhost:8888/')
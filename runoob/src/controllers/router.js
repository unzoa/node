let express = require('express')
let app = express()
let _log = console.log.bind(console)

/*
* url set req.path
* _log() 终端打印
* res.send() 返回页面内容
*/
// main page
app.get('/', function (req, res) {
  _log("主页 GET 请求")
  res.send({"component": "mainGet"})
})

app.post('/', (req, res) => {
  _log("主页 POST 请求")
  res.send({'component': 'mainPost'})
})

// del_uer
app.get('/del_user', (req, res) => {
  _log('del_user')
  res.send({'component': 'this is del_user'})
})

app.get('/list_user', (req, res) => {
  _log('list_user')
  res.send({'component': 'this is list_user'})
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', (req, res) => {   
   _log("/ab*cd GET 请求")
   res.send(req.path)
})

app.listen(8082)
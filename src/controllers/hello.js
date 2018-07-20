var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send({"haha": "haha"})
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})
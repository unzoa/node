var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);
    else  next();
});

app.get('/run', function (req, res) {
  if (req.query.s === 'aaa') {
    res.send(JSON.stringify({status: 200, message: 'welcome'}))
  } else {
    res.send(JSON.stringify({status: 403, message: 'sorry, you can\'t get in '}))
  }
})

var server = app.listen(2018, function () {
  var host = server.address().address
  var port = server.address().port
})
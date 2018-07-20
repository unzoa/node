let express = require('express')
let app = express()
/*
* ___dirname 代表本文件所在文件夹
* process.cwd() 代表项目绝对根
*/
// 将assets
app.use(express.static(process.cwd() + '/assets'))
 
app.get('/', function (req, res) {
   res.send('Hello World')
})

app.listen('8083', () => {
  console.log('8083')
})

let express = require('express')
let app = express()

app.use(express.static('../view'))

app.get('/process_get', function (req, res) {
  // 输出 JSON 格式
  let response = {
    "first_name":req.query.first_name,
    "last_name":req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})


let bodyParser = require('body-parser')
// 创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/process_post', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
   let response = {
       "first_name":req.body.first_name,
       "last_name":req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

let fs = require("fs")
let multer = require('multer')
app.use(multer({ dest: '/tmp/'}).array('image'))
app.post('/file_upload', function (req, res) {
 
  console.log(req.files[0])  // 上传的文件信息

  var des_file = "../fileUpload/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err )
      }else{
        response = {
          message:'File uploaded successfully', 
          filename:req.files[0].originalname
        }
      }
      console.log( response )
      res.end( JSON.stringify( response ) )
    })
  })
})
app.listen(8084)
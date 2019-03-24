// koa2 导入后是一个class, 所以大写Koa
const Koa = require('koa')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(controller())

app.listen(1992)

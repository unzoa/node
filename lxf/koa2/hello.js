const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  // ctx 由koa封装的request和response
  // next 是koa传入的将要处理的下一个异步函数
  ctx.response.type = 'text/html'
  ctx.response.body = 'Hello Koa2'
  console.log(111)

  // async标记的函数称为异步函数
  // 用await调用另一个异步函数
  await next()

})

app.use(async (ctx, next) => {
  console.log(222)
})

app.use(async (ctx, next) => {
  // 由于222中没有调用await next()

  // 原因是koa把很多async函数组成一个处理链，
  // 每个async函数都可以做一些自己的事情，
  // 然后用await next()来调用下一个async函数

  console.log(333)
})

// 111
// 222

'use strict'

const api_index = async (ctx, next) => {
  ctx.response.body = `
    <h1>Index</h1>
    <form action="/signIn" method="post">
      <input type="text" name="name" value="123" />
      <input type="submit" value="submit" />
    </form>
  `
}

const api_signIn = async (ctx, next) => {
  let name = ctx.request.body.name || ''
  if (name === '123') {
    ctx.response.body = `Welcome, ${name}!`
  } else {
    ctx.response.body = `Login Failed`
  }
}

module.exports = {
  'GET /': api_index,
  'POST /signIn': api_signIn
}
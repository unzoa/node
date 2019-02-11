'use strict'

const fn_hello = async (ctx, next) => {
  let name = ctx.params.name
  ctx.response.body = JSON.stringify(`Hello ${name}!`)
}

module.exports = {
  'GET /hello/:name': fn_hello
}
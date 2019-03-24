'use strict'

const api_hello = async (ctx, next) => {
  let name = ctx.params.name
  ctx.response.body = JSON.stringify(`Hello ${name}!`)
}

module.exports = {
  'GET /hello/:name': api_hello
}
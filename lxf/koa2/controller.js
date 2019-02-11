`use strict`

const fs = require('fs')

let addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      router.get(
        url.substring(4),
        mapping[url]
      )
    } else if (url.startsWith('POST ')) {
      router.post(
        url.substring(5),
        mapping[url]
      )
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

let addControllers = (router, dir) => {
  let files = fs.readdirSync(__dirname + '/' + dir)
  let jsFiles = files.filter(f => {
    return f.endsWith('.js')
  })

  jsFiles.forEach((i, j) => {
    let mapping = require(__dirname + `/${dir}/${i}`)
    addMapping(router, mapping)
  })
}

module.exports = (dir) => {
  // 如果不传参，扫描目录默认为controller
  let controllerDir = dir || 'controllers'
  let router = require('koa-router')()

  addControllers(router, controllerDir)

  return router.routes()
}

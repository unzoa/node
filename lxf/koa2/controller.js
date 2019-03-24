`use strict`

const fs = require('fs')

// 处理每个js文件
let addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET ')) { // 如果url类似"GET xxx"
      router.get(
        url.substring(4),
        mapping[url]
      )
    } else if (url.startsWith('POST ')) { // 如果url类似"POST xxx":
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

  // 过滤出.js文件
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
  // 引入router模块
  let router = require('koa-router')()

  // 调用添加路由
  addControllers(router, controllerDir)

  return router.routes()
}

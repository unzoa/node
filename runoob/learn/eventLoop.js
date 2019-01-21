// node.js 使用事件驱动模式

// 当webserver接收请求后就关闭并处理
// 然后去执行下一个web请求

// 当这个请求完成后，就把它放到队列中
// 到到达队列开头时候，这个结果就反给用户

// 这样模型高效可扩展
// 因为webserver一直接受请求而且不等待任何读写操作
// 这也被称作- 非阻塞IO. 或者。事件驱动IO

// 事件驱动模型中，会生成一个主循环监听事件，当检测到事件时候发回回掉函数

// EventEmmiters -> Events -> Event loop -> Event Handlers

// 引入events
let events = require('events')
// 创建eventEmmiter
let EventEmitter = new events.EventEmitter()

// EventEmitter.on 绑定事件
// EventEmitter.emit 触发事件


// 创建事件处理程序
let connectHandler = () => {
  console.log('连接成功')

  // 触发data_received 事件
  EventEmitter.emit('data_received')
}

// 绑定connection 事件处理程序
EventEmitter.on('connection', connectHandler)

// 使用匿名函数绑定 data_received 事件
EventEmitter.on('data_received', () => {
  console.log('数据接收成功')
})

EventEmitter.emit('connection')

console.log('程序执行完毕')

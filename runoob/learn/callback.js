let fs = require('fs')

// I/O 程序模式 异步回掉

// 非阻塞
fs.readFile('../img/2.png', (err, res) => {
  if (err) {return console.log(err)}
    console.log('非阻塞', res.toString())
})

// 阻塞
// let data = fs.readFileSync('./helloworld.js')
// console.log('阻塞', data.toString())

// console.log('program end..................')

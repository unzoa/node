'use strict'

module.exports = {
  exportName: (name) => {
    console.log(`Hello, ${name}`)
  }
}

// module.exports = $ // 麻烦

// export default $ // SyntaxError: Unexpected token export
// v8 node es6支持不完善

// exports.a = $ // { a: { exportName: [Function: exportName] } }
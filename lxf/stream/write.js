'use strict'

const fs = require('fs')

// 建立了新的文件
var ws1 = fs.createWriteStream('./stream/file-test/output1.txt', 'utf-8')
ws1.write('使用Stream写入文本数据...\n')
ws1.write('END.')
ws1.end()

### 引用文件路径问题
- 终端执行node命令时所在路径 => 执行文件的相对地址
    + **跟**下执行 node fs/stat.js
    + stat.js 引用文件路径的相对路径是**根**
    + **require('path')**
        * const path = require('path')
        * const root = path.resolve(process.argv[2] || '.')
            - root 当前文件所在目录
        * path.join(root, '/fileName')
            ||
        * path.resolve(__dirname, 'fileName')

### stat异步获取文件信息
- 模块导出时候也是个异步，需要callback()

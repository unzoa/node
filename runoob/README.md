# node-learn

## node-express

##### prepare install
    npm install express --save-dev
    npm install body-parser --save-dev
    npm install cookie-parser --save-dev
    npm install multer --save-dev

##### server.js
    proxy set
    api build
      /run

##### nginx
    location:
    - proxy set
      /api2/ 自定义接口前缀
    - index set

##### webfront
    * ajax
      /api2/run
    * vue-cli
    |-config
    |-|-index.js
      module.exports = {
        dev: {
          proxyTable: {
            '/api':{ 
              target: 'http://127.0.0.1:2018',
              changeOrigin: true,
              pathRewrite: {
                '^/api': '/' // key is webfront set, value is webback set.
              }
            }
          }
        }
      }
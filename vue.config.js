module.exports = {
    lintOnSave:false,
    devServer:{
      host:'localhost',
      port:8081,
      proxy:{
        '/':{
          target:'http://localhost:8088/',
          changeOrigin:true,
          pathRewrite:{
            '/':''
          }
        }
      }
    }
  }

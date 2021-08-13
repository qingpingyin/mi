'use strict'
const path = require('path')
const defaultSettings = require('./src/config/index.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = dir => path.join(__dirname, dir)// page title
const name = defaultSettings.title || 'mi'
// 生产环境，测试和正式
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
    publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
    //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
    outputDir: 'dist', //  生产环境构建文件的目录
    assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: !IS_PROD,
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    devServer: {
        port: 9020, // 端口
        open: false, // 启动后打开浏览器
        overlay: {
            //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
            warnings: false,
            errors: true
        },
        // proxy: {
        //   //配置跨域
        //   '/': {
        //       target: "http://localhost:8088/api",
        //       // ws:true,
        //       changOrigin:true,
        //       pathRewrite:{
        //           '^/':''
        //       }
        //   }
        // }
    },
    css: {
        extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        sourceMap: false,
        loaderOptions: {
            scss: {
                prependData: `
          @import "assets/scss/mixin.scss";
          @import "assets/scss/normalize.scss";
          `
            }
        }
    },
    configureWebpack: {
        name:name,
        devtool: 'source-map',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }

    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
        /**
         * 打包分析
         */
        if (IS_PROD) {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static'
                }
            ])
        }
        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(!IS_PROD, config => config.devtool('cheap-source-map'))

        config.when(IS_PROD, config => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        // 将 runtime 作为内联引入不单独存在
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end()
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 3, //  被至少用三次以上打包分离
                        priority: 5, // 优先级
                        reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    node_vendors: {
                        name: 'chunk-libs',
                        chunks: 'initial', // 只打包初始时依赖的第三方
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10
                    },
                }
            })
            config.optimization.runtimeChunk('single')
        })
    }
}


'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// module：当前组件对象，当前模块对象
// exports是module对象的属性
// 外界的组件要访问本组件，其实是访问module.exports，exports就是该组件的一个接口

// module.exports除了可以添加变量，还可以添加方法
// 1、声明方法、变量
// var method = function(){
//   console.log("组件方法");
// }
// var x = "变量x";
// 2、关联方法、变量
// module.exports.method = method();
// module.exports.x = x;

module.exports = {
  // 开发过程中使用的配置
  dev: {
    // 调用环境配置
    env: require('./dev.env'),//webpack的编译环境
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},// 请求代理表，在这里可以配置特定的请求代理到对应的API接口

    // 开发服务器设置
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // dev-server监听的端口
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // 默认使用Eslint-JS代码检查工具
    useEslint: false,
    // 值为true，则检查的警告和错误将会在浏览器中显示
    showEslintErrorsInOverlay: false,

    // Source Maps 相关
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true // 是否开启 cssSourceMap
  },

  // 构建产品时使用的配置
  build: {
    // 调用环境配置
    env: require('./prod.env'),//webpack的编译环境
    index: path.resolve(__dirname, '../dist/index.html'),//编译输入的index.html文件

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),// webpack输出的目标文件夹路径
    assetsSubDirectory: 'static',// webpack编译输出的二级文件夹
    assetsPublicPath: '/',// webpack编译输出的发布路径

    //SourceMap映射文件：存储 源代码与编译代码 映射的信息文件
    productionSourceMap: true,// 使用SourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    //gzip：文件压缩程序
    productionGzip: false,// 默认不打开开启gzip模式
    productionGzipExtensions: ['js', 'css'],// gzip模式下需要压缩的文件的扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  devServer: {                //记住，别写错了devServer

    proxy: {                 //设置代理，必须填
      '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'https://api.map.baidu.com',     //代理的目标地址
        changeOrigin: true,              //是否设置同源，输入是的
        pathRewrite: {                   //路径重写
          '^/api': ''                     //选择忽略拦截器里面的单词
        }
      }
    },

    // productionSourceMap: false,

    // css: {
    //   // 是否使用css分离插件 ExtractTextPlugin
    //   extract: true,
    //   // 开启 CSS source maps?
    //   sourceMap: false,
    //   // css预设器配置项
    //   loaderOptions: {},
    //   // 启用 CSS modules for all css / pre-processor files.
    //   modules: false
    // },

    // chainWebpack: config => {
    //   config.module
    //       .rule('images')
    //       .use('image-webpack-loader')
    //       .loader('image-webpack-loader')
    //       .options({
    //         bypassOnDebug: true
    //       })
    //       .end()
    // },

    // plugins:[
    //   new CompressionPlugin({
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: /\.js$|\.html$|\.json$|\.css/,
    //     threshold: 0, // 只有大小大于该值的资源会被处理
    //     minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
    //     deleteOriginalAssets: true // 删除原文件
    //   })
    // ],

  },

}

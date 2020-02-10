let path = require('path');
let webpack = require('webpack');
let nginxDev = 'http://10.10.10.166:12300';
let nginxSynergy='http://10.10.10.166:10311';//产业协同平台
let nginxManage='http://10.10.10.166:10312';//智慧园区管理平台
let nginxIntegration='http://10.10.10.166:10313';//智慧服务集成平台
const nginx = 'http://192.168.6.3:9990';
let config = [{
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    inline:false,
    hot:false,
    stats: {
      chunks: false
    },
    host:'0.0.0.0',
    proxy: {
      '/web_s': {
        target: nginx,
        changeOrigin: true,
        pathRewrite: {
          '^/web_s': '/'
        },
      },
      '/chachongauth_s': {
        target: nginxDev,
        changeOrigin: true,
      },
      '/zycIntegration_s': {
        target: nginxIntegration,
        changeOrigin: true,
        pathRewrite: {
          '^/zycIntegration_s': '/'
        },
      }
    },
  },
  entry: {
    chachongManageSys: ['./docs/ZYCSys/main/app'],
    vendor: ["react", "react-dom",'jquery'],
  },
  node: {
    fs: 'empty'
  },
  output: {
    path:'/' ,
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: 'chunks/[name].chunk.js',
  },
  module: require('./module.config.js'),
  resolve: require('./resolve.config.js'),
  plugins: require('./plugin.config.js'),
}];

module.exports = config;


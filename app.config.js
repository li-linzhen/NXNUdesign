const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
let resolve = require('./resolve.config');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let outPath = path.resolve(__dirname,'build');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let commonModule = require('./module.config');


module.exports = {
  devtool: false,
  entry: {
    ZYC: ['babel-polyfill', './docs/ZYCSys/main/app'],
    vendor: ["react", "react-dom",'jquery'],
  },
  
  node: {
    fs: 'empty'
  },
  
  output: {
    path: outPath,
    filename: '[name].[hash].js',
    publicPath: '/',
    chunkFilename: 'chunks/[name].chunk.js',
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    
    //解决moment打包的时候把所有的语言都打包进去的问题
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    
    //压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
        drop_debugger: true,
        drop_console: true
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      // sourceMap: shouldUseSourceMap,
      sourceMap: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    
    //提取CSS
    new ExtractTextPlugin('lz-react.css'),
    
    //分析
    new BundleAnalyzerPlugin(),
    
    //提取公共文件
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"]
    }),
    
    //html模板
    new HtmlWebpackPlugin({
      inject: true,                 //在body底部插入 script
      template: 'docs/public/index.html',   //插入到哪个html下
      // chunks: ['main'],			    //插入哪个js(跟entry对应)
      filename: "index.html",
      minify:true
    }),
  ],
  
  module: commonModule,
  resolve,
};


let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let env = 'development';
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.NoEmitOnErrorsPlugin(),//不出错
    new ExtractTextPlugin('lz-react.css'),
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
];

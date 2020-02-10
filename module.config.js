let ExtractTextPlugin = require('extract-text-webpack-plugin');
let autoFix = require('./postcss.config');

module.exports = {
  loaders: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: 'eslint-loader'
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use:'ts-loader'
    },
    {
      test: /\.json$/,
      loaders: [
        'json-loader?cacheDirectory'
      ]
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use:[
          {
            loader:'css-loader',
          },{
            loader:'postcss-loader',
            options:{
                ...autoFix
            }
          }
        ]
      })
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use:ExtractTextPlugin.extract({
        fallback: "style-loader",
        use:['css-loader', 'sass-loader',
          {
            loader:'postcss-loader',
            options:{
              ...autoFix
            }
          }]
      })
    },
    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader","less-loader"]
      })
    },
    {
      test: /\.jpg$/,
      loader: 'file-loader'
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: [
        'babel-loader?cacheDirectory'
      ]
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }
  ]
};


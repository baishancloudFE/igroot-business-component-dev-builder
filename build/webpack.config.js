const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const utils = require('./utils')
const isProd = process.env.NODE_ENV === 'production'

function resolve(dir = '') {
  return path.join(process.cwd(), dir)
}

const rules = [
  ...utils.styleLoaders({ sourceMap: false }),
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: resolve('src'),
    options: {
      presets: [
        "es2015",
        "react",
        "stage-0"
      ],
      plugins: [
        "transform-decorators-legacy",
        ["import", {
          "libraryName": "igroot",
          "style": "css"
        }]
      ],
      filename: __dirname
    }
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    }
  }
]

module.exports = {
  devtool: '#cheap-eval-source-map',  
  entry: {
    index: [
      path.join(__dirname, './dev-client.js'),
      path.join(process.cwd(), './dev.js')
    ]
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: { rules },
  context: path.join(__dirname, '../'),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['index']
    })
  ]
}
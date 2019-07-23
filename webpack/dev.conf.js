const webpack = require('webpack')
const portfinder = require('portfinder')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const { resPath, baseConfig } = require('./base')

const webpackConfig = Object.assign(baseConfig('development'), {
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: resPath('public'),
    watchContentBase: true,
    host: '127.0.0.1',
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },

  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: resPath('public/index.html'),
        chunks: ['Bmdb'],
        env: 'development'
      }
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = webpackConfig.devServer.port

  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      webpackConfig.devServer.port = port

      webpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running at: http://127.0.0.1:${port}`]
        }
      }))

      resolve(webpackConfig)
    }
  })
})

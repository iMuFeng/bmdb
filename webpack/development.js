const webpack = require('webpack')
const portfinder = require('portfinder')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve, baseConfig, basePlugins } = require('./common')

const mode = 'development'
const webpackConfig = Object.assign(baseConfig(mode), {
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: [resolve('public')],
    watchContentBase: true,
    host: '0.0.0.0',
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: false,
    watchOptions: {
      ignored: /node_modules/
    }
  },

  plugins: basePlugins(mode).concat([
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      chunks: ['bmdb'],
      env: mode,
      inject: 'head'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ])
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = webpackConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = String(port)
      webpackConfig.devServer.port = port
      console.log(`Your application is running at: http://127.0.0.1:${port}`)
      resolve(webpackConfig)
    }
  })
})

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    new webpack.HotModuleReplacementPlugin()
  ])
})

module.exports = webpackConfig

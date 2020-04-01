const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resPath (dir) {
  return path.resolve(__dirname, '..', dir)
}

function baseConfig (mode) {
  const isDev = mode === 'development'

  return {
    mode,

    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',

    entry: {
      Bmdb: './src/index.js'
    },

    output: {
      path: resPath('dist'),
      filename: isDev ? '[name].[hash].js' : '[name].min.js',
      library: '[name]',
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true,
      publicPath: '/'
    },

    resolve: {
      alias: {
        '@': resPath('src')
      },
      extensions: ['.js', '.scss']
    },

    externals: {
      jQuery: 'jQuery'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'thread-loader',
            {
              loader: 'eslint-loader',
              options: {
                formatter: require('eslint-friendly-formatter'),
                emitWarning: false
              }
            }
          ],
          enforce: 'pre',
          include: [
            resPath('src')
          ]
        },
        {
          test: /\.js$/,
          use: [
            'thread-loader',
            'babel-loader'
          ],
          include: [
            resPath('src'),
            resPath('node_modules/webpack-dev-server/client')
          ]
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'thread-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [
            'thread-loader',
            'html-loader'
          ]
        },
        {
          test: /\.art$/,
          use: [
            'thread-loader',
            {
              loader: 'art-template-loader',
              options: {
                minimize: true
              }
            }
          ]
        }
      ]
    },

    node: {
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  }
}

module.exports = {
  resPath,
  baseConfig
}

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
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [
            resPath('src')
          ],
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: false
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
            resPath('src'),
            resPath('node_modules/webpack-dev-server/client')
          ]
        },
        {
          test: /\.scss$/,
          use: [isDev ? 'css-hot-loader' : null]
            .filter(item => item !== null)
            .concat([
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              'postcss-loader',
              'sass-loader'
            ])
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.art$/,
          loader: 'art-template-loader',
          options: {
            minimize: true
          }
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

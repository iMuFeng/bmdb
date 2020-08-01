const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pkg = require('../package.json')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

function baseConfig(mode) {
  const isDev = mode === 'development'

  const cssLoaders = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: {
          localIdentName: '[hash:base64:5]'
        }
      }
    },
    'postcss-loader'
  ]

  return {
    mode,

    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',

    entry: {
      bmdb: './src/index.tsx'
    },

    output: {
      path: resolve('dist'),
      filename: isDev ? '[name].[hash].js' : `[name].js`,
      library: 'Bmdb',
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true,
      publicPath: '/'
    },

    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.tsx', '.ts', '.js']
    },

    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
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
          include: [resolve('src')]
        },

        {
          test: /\.(js|ts|tsx)$/,
          use: ['thread-loader', 'babel-loader'],
          include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
        },

        {
          test: /\.scss$/,
          use: [
            ...cssLoaders,
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                prependData: '@import "~@/utils/global.scss";'
              }
            }
          ]
        },

        {
          test: /\.css$/,
          use: cssLoaders
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

function basePlugins(mode) {
  const env = {
    NODE_ENV: JSON.stringify(mode),
    BMDB_APP_NAME: JSON.stringify(pkg.name),
    BMDB_APP_VERSION: JSON.stringify(pkg.version)
  }

  return [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
}

module.exports = {
  resolve,
  baseConfig,
  basePlugins
}

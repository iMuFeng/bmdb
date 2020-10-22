const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

function baseConfig(mode) {
  const isDev = mode === 'development'

  return {
    mode,

    devtool: isDev ? 'cheap-module-source-map' : 'source-map',

    entry: {
      bmdb: './src/index.tsx'
    },

    output: {
      path: resolve('dist'),
      filename: isDev ? '[name].[hash].js' : `[name].js`,
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
          use: ['babel-loader'],
          include: [
            resolve('src'),
            resolve('node_modules/webpack-dev-server/client'),

            //!!! compile ES6 to ES5 in modules
            resolve('node_modules/unfetch'),
            resolve('node_modules/@puckjs/utils')
          ]
        }
      ]
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

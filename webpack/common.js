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

    target: ['web', 'es5'],

    devtool: isDev ? 'cheap-module-source-map' : 'source-map',

    entry: {
      bmdb: './src/index.tsx'
    },

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },

    output: {
      path: resolve('dist'),
      filename: isDev ? '[name].[contenthash].js' : '[name].js',
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

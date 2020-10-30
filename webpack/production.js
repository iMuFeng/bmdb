const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const pkg = require('../package.json')
const { baseConfig, basePlugins } = require('./common')

const mode = 'production'
const banner = `/*!
  * Bmdb ${pkg.version} (https://github.com/iMuFeng/bmdb)
  * Apply for secret at https://bm.weajs.com
  */`

console.log('Building for production...\n')

function build(webpackConfig) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err)
      } else {
        process.stdout.write(stats.toString())
      }
    })
  })
}

const bp = [false, true].map(ie =>
  build(
    Object.assign(baseConfig(mode, ie), {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: true,
            parallel: true,
            terserOptions: {
              output: {
                preamble: banner,
                comments: false
              },
              safari10: true
            }
          })
        ]
      },
      plugins: basePlugins(mode)
    })
  )
)

Promise.all(bp).catch(err => {
  console.error(err)
  process.exit(1)
})

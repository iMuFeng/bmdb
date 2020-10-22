const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const pkg = require('../package.json')
const { baseConfig, basePlugins } = require('./common')

const mode = 'production'
const banner = `/*!
  * Bmdb ${pkg.version} (https://github.com/iMuFeng/bmdb)
  * Apply for secret at https://bm.weajs.com
  */`

const webpackConfig = Object.assign(baseConfig(mode), {
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
  plugins: basePlugins(mode).concat(
    [process.env.ANALYZER ? new BundleAnalyzerPlugin() : undefined].filter(
      p => p !== undefined
    )
  )
})

console.log('Building for production...\n')

webpack(webpackConfig, (err, stats) => {
  if (err) throw err

  process.stdout.write(stats.toString())

  if (stats.hasErrors()) {
    console.error('Build failed with errors.\n')
    process.exit(1)
  }

  console.log('Build complete.\n')
})

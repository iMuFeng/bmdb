const cssnano = require('cssnano')
const webpack = require('webpack')
const safeParser = require('postcss-safe-parser')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
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
        cache: true,
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
    [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),

      process.env.ANALYZER ? new BundleAnalyzerPlugin() : undefined,

      new OptimizeCSSPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          parser: safeParser,
          safe: true,
          autoprefixer: true,
          map: false
        },
        canPrint: false
      })
    ].filter(p => p !== undefined)
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

const rm = require('rimraf')
const cssnano = require('cssnano')
const webpack = require('webpack')
const safeParser = require('postcss-safe-parser')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const pkg = require('../package.json')
const { resPath, baseConfig } = require('./base')

const banner =
`/*!
  * Bmdb ${pkg.version} (https://github.com/iMuFeng/bmdb)
  * Apply for secret at https://bm.weajs.com
  */`

const webpackConfig = Object.assign(baseConfig('production'), {
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
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        parser: safeParser,
        safe: true,
        autoprefixer: true,
        map: true
      },
      canPrint: true
    })
  ]
})

console.log('Building for production...\n')

rm(resPath('dist'), err => {
  if (err) throw err

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.error('Build failed with errors.\n')
      process.exit(1)
    }

    console.log('Build complete.\n')
  })
})

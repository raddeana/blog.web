'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-plugin-manifest')

// 配置
const config = require('../config')
const utils = require('./utils')
const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      dev: false
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[contenthash].js'),
    chunkFilename: utils.assetsPath('js/[name].[contenthash].js'),
    publicPath: 'https://raddeana-robot.oss-cn-hangzhou.aliyuncs.com'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      name: true,
      chunks: 'all',
      maxInitialRequests: 10,
      cacheGroups: {
        utils: {
          name: 'utils',
          chunks: 'all',
          minChunks: 2,
          priority: -20,
          minSize: 0
        },
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'all',
          priority: -10
        }
     }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    
    // extract css into its own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: 'templates/home.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['runtime', 'home'],
      xhtml: true
    }),

    new HtmlWebpackPlugin({
      filename: 'talk.html',
      template: 'templates/voyage.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['runtime', 'voyage'],
      xhtml: true
    }),

    new HtmlWebpackPlugin({
      filename: 'blog.html',
      template: 'templates/blog.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['runtime', 'utils', 'vendor', 'blog'],
      xhtml: true
    }),

    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    
    // manifest file
    new ManifestPlugin({
      fileName: 'manifest.json',
      prettyPrint: true
    })
    // // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true,
      dev: true
    })
  },
  devServer: {
    historyApiFallback:{
      index: '/index.html'
    },
    port: config.dev.port,
    contentBase: './',
    inline: true,
    progress: true,
    open: false,
    hot: true,
    hotOnly: true,
    compress: false,
    host: config.dev.host
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      template: 'templates/blog.html',
      chunks: ['blog'],
      xhtml: true
    }),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: 'templates/home.html',
      chunks: ['home'],
      xhtml: true
    }),
    new HtmlWebpackPlugin({
      filename: 'voyage.html',
      template: 'templates/voyage.html',
      chunks: ['voyage'],
      xhtml: true
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: 'templates/errors/404.html',
      xhtml: true
    }),
    new HtmlWebpackPlugin({
      filename: '500.html',
      template: 'templates/errors/500.html',
      xhtml: true
    }),
    new FriendlyErrorsPlugin()
  ],
})

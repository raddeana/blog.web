'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      template: 'templates/blog.html',
      chunks: ['runtime', 'utils', 'vendor', 'blog'],
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

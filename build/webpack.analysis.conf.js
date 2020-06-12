'use strict'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodWebpackConfig = require('./webpack.prod.conf')
const merge = require('webpack-merge')

module.exports = merge(prodWebpackConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})

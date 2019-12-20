/**
 * webpack 环境配置
 * @author Philip
 */
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap
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
        open: true,
        hot: true,
        hotOnly: true,
        compress: true,
        host: config.dev.host
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
        new FriendlyErrorsPlugin(),
        new VueLoaderPlugin()
    ]
})

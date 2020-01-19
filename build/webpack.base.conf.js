/**
 * 基础配置
 * @author Philip
 */

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        'blog': './src/blog/main.js',
        'home': './src/home.js',
        'voyage': './src/voyage.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        libraryTarget: 'umd'
    },
    optimization: {
        splitChunks: {
            name: 'common',
            minChunks: 1,
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'common',
                    minChunks: 2,
                    reuseExistingChunk: true,
                    priority: 5
                },
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'all',
                    priority: 10
                }
           }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: [resolve('src')]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[ext]')
            }
        }]
    }
}

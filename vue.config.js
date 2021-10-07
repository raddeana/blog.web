const autoprefixer = require('autoprefixer');
const compressionPlugin = require('compression-webpack-plugin');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  productionSourceMap:false,
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer()
        ]
      }
    },
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true,
    } : false
  },
  chainWebpack: (config) => {
    // config
    //   .optimization.splitChunks({
    //     chunks: 'all',
    //     cacheGroups: {
    //       element: {
    //         name: 'chunk-element-ui',
    //         priority: 20,
    //         test: /[\\/]node_modules[\\/]_?element(.*)/
    //       }
    //     }
    //   });
  },
  configureWebpack: (config) => {
    config.plugins.push(Components({
      resolvers: [ElementPlusResolver()],
    }));

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new compressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/,
        threshold: 10240,
        deleteOriginalAssets: false,
        minRatio: 0.8
      }));
    }
  }
};
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

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
    config
      .optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vantUi: {
            name: 'chunk-vant-ui',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      });
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.use_analyzer){
        config.plugins.push(new BundleAnalyzerPlugin());
      }

      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/,
        threshold: 10240,
        deleteOriginalAssets: false,
        minRatio: 0.8
      }));
    }
  }
};
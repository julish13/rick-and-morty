const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: '3000',
    static: {
      directory: path.join(__dirname, '../public'),
    },
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
});

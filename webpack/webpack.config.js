const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index_bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src', 'components'),
      '@screens': path.resolve(__dirname, '../src', 'screens'),
      '@redux': path.resolve(__dirname, '../src', 'redux'),
      '@lib': path.resolve(__dirname, '../lib'),
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public', 'index.html'),
    }),
  ],
};

var path = require('path')
var webpack = require('webpack')
var Clean = require('clean-webpack-plugin')

module.exports = {

  devtool: 'eval',

  entry: [
    './client/index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'client'),
        path.resolve(__dirname, 'shared')
      ],
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  plugins: [
    new Clean(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  watch: true

}

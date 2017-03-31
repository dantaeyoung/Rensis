const path = require('path');
const webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var HtmlWebpackPlugin =  require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const config = {
  context: __dirname,
  entry: {
        main: ['./site/main.js', hotMiddlewareScript]
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/',
    filename: 'bundle-[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader?outputStyle=expanded'
          ]
        })
			},
      { test: /\.(png|jpg|svg|json)$/, loader: 'file-loader?name=[name].[ext]' }
    ]
  },
    plugins: [
    new HtmlWebpackPlugin({
      template: './site/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('bundle-[name].css')
    ]    
};

module.exports = config;



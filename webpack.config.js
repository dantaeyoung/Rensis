const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin =  require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const config = {
  entry: './site/main.js',
	output: {
    path: __dirname + '/dist', //where it puts on build
    publicPath: '/', // where it links to
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: process.cwd(),
    inline: true,
    hot: true
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader?outputStyle=expanded'
          ]
        })
			}	,
      { test: /\.(png|jpg|svg|json)$/, loader: 'file-loader?name=[name].[ext]' }

    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
      template: './site/index.html'
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
	]	
};

module.exports = config;



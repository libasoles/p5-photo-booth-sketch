const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack')
const fs = require('fs-extra')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

/**
 * Init
 */
module.exports = {
		devtool: 'cheap-source-map',
	  plugins: [
	    new webpack.LoaderOptionsPlugin({
	      minimize: true,
	      debug: false
	    }),
	    new webpack.DefinePlugin({
	      'process.env': {
	        'NODE_ENV': JSON.stringify('production')
	      }
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      sourceMap: true,
	      beautify: false,
	      mangle: {
	        screw_ie8: true,
	        keep_fnames: true
	      },
	      compress: {
	        warnings: false,
	        screw_ie8: true
	      },
	      output: {
	        comments: false,
	        screw_ie8: true
	      },
	      comments: false
	    })
	  ]
});

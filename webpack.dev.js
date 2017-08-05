const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack')
const fs = require('fs-extra')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

/**
 * Config
 */
const config = {
	server_host: 'localhost',
	server_port: 7800,
	dir_src: './src',
	dir_dist: './public'
}

config.publicPath = 'http://' + config.server_host + ':' + config.server_port + '/public';

/**
 * Init
 */
module.exports = Merge(CommonConfig, {
		plugins: [
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
    ],
    devtool: 'source-map',
		devServer: {
        hot: true, // Tell the dev-server we're using HMR
        contentBase: config.dir_dist,
        publicPath : config.publicPath,
        host: config.server_host,
        port: config.server_port,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        historyApiFallback: true
    }
});

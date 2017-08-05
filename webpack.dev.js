const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack')
const fs = require('fs-extra')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
let config = require('./server.config.js');

/**
 * Config
 */
config = Object.assign(config, {
	server_host: 'localhost',
	server_port: 7800
});

// Build for webpack-dev-server with hot reloading
config.publicPath = 'http://' + config.server_host + ':' + config.server_port + config.publicPath;

/**
 * Init
 */
module.exports = Merge(CommonConfig, {
		plugins: [
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
    ],
		output: {
			publicPath: config.publicPath
		},
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

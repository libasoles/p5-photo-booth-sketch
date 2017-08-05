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
module.exports = {
    entry: {
        app: [config.dir_src+'/main.ts', config.dir_src+'/styles.scss']
    },
    output: {
        path: path.resolve(config.dir_dist),
        filename: '[name].bundle.js',
        publicPath: config.publicPath
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
		plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new HtmlWebpackPlugin({
            template : config.dir_src + '/index.html',
            hash     : false,
            filename : 'index.html',
            inject   : 'body',
            minify   : {
                collapseWhitespace : true
            }
        }),
        new ExtractTextPlugin({ // define where to save the file
		      filename: '[name].bundle.css',
		      allChunks: true
		    }),
				new CheckerPlugin()
    ],
    module: {
        rules: [
            {
                test    : /\.(js|jsx)$/,
                exclude : /node_modules/,
                loader  : 'babel-loader',
                query: {
                presets: ['es2015', 'stage-2']
                }
            },
            {   test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test   : /\.json$/,
                loader : 'json-loader'
            },
            { // regular css files
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?importLoaders=1'
                })
            },
            { // sass / scss loader for webpack
                    test: /\.(sass|scss)$/,
                    use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
                }
        ]
    },
    externals: {
        'p5': 'p5'
    }
}

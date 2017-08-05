const path = require('path');
const webpack = require('webpack')
const fs = require('fs-extra')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const config = require('./server.config.js');

fs.copySync(config.dir_static, config.dir_dist)

/**
 * Init
 */
module.exports = {
    entry: {
        app: [config.dir_src+'/main.ts', config.dir_src+'/styles.scss']
    },
    output: {
        path: path.resolve(config.dir_dist),
        filename: '[name].bundle.js'
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
						favicon	 : config.dir_src + '/favicon.ico',
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

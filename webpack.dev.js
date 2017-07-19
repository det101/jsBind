/**
 * Created by luxiaolong on 2017/6/16.
 */

var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist",
        library: 'BindingUtils',
        libraryTarget: "umd"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                    ,'eslint-loader'
                ]
            }, {
                test: /.less|css$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader',
                    options: {
                        strictMath: true,
                        noIeCompat: true
                    } // compiles Less to CSS
                }]
            }, {
                test: /\.(eot|svg|ttf|woff|jpe?g|png|gif)/i,
                use: [
                    'url-loader?limit=102400'
                ]
            }
        ]
    },

    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]

};
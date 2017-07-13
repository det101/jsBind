/**
 * Created by luxiaolong on 2017/6/16.
 */

var path = require('path');
var webpack = require('webpack');
var ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    entry: './src/jsbinding.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        //libraryTarget: "umd"
        filename: '[name].bundle.js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },

    //devtool: 'cheap-module-source-map',

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
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                //warnings: false
            },
            comments: false
        }),
        new ZipPlugin({
            // OPTIONAL: defaults to the Webpack output path (above)
            // can be relative (to Webpack output path) or absolute
            //path: 'zip',

            // OPTIONAL: defaults to the Webpack output filename (above) or,
            // if not present, the basename of the path
            filename: 'bundle.zip',

            // OPTIONAL: defaults to 'zip'
            // the file extension to use instead of 'zip'
            extension: 'zip',

            // OPTIONAL: defaults an empty string
            // the prefix for the files included in the zip file
            //pathPrefix: 'relative/path',

            // OPTIONAL: defaults to including everything
            // can be a string, a RegExp, or an array of strings and RegExps
            include: [/\.js$/],

            // OPTIONAL: defaults to excluding nothing
            // can be a string, a RegExp, or an array of strings and RegExps
            // if a file matches both include and exclude, exclude takes precedence
            exclude: [/\.png$/, /\.html$/],

            // yazl Options

            // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
            fileOptions: {
                mtime: new Date(),
                mode: 0o100664,
                compress: true,
                forceZip64Format: false,
            },

            // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
            zipOptions: {
                forceZip64Format: false,
            },
        })
    ]

};
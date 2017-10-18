var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "./css/styles.bundle.css",
    publicPath: "build"
});


module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './js/app.bundle.js',
        publicPath: "build"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ],
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use:[
                        {
                            loader:"css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass,
        new webpack.HotModuleReplacementPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
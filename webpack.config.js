const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js'
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{ 
                test: /\.js$/, 
                use: { loader: "babel-loader" }, 
                exclude: /node_modules/ 
            },
            {
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] 
            }
        ]
    },
    plugins: [ 
       new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}), //'style.css'}),
       new HtmlWebpackPlugin({
        inject: false, 
        hash: true, // для страницы нужно считать хеш  Удалить???
        template: './src/index.html', 
        filename: 'index.html' 
      }),
      new WebpackMd5Hash()
    ]
}

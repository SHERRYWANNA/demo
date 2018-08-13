const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    }, //入口文件
    output: {
        path: path.resolve(__dirname), 
        filename: 'dist/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                },
                exclude: '/node_modules/'
            }
        ]
    },
    //插件
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new VueLoaderPlugin()
    ]
};

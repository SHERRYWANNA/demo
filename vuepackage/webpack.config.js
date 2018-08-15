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
                loaders: [
                    'babel-loader'
                ],
                exclude: '/node_modules/'
            },
            {
                test: /\.vue$/,
                loaders: [
                    'vue-loader',
                    'vue-style-loader'
                ],
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        }
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

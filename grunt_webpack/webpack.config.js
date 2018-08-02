var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index.js')   
    }, //入口文件
    output: {
        path: __dirname, 
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
    ]
}
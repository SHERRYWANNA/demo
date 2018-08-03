var webpack = require('webpack');
var path = require('path');


module.exports = function(project, environment) {
    var _projectConfig = require('./config/' + project + '.json'),
        _projectPath = getProjectPath(_projectConfig),
        _babelEntry = getCompleteEntry(_projectConfig);

    var obj = {
        entry: _babelEntry, //入口文件
        output: {
            path: _projectPath, 
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
    };

    if ('dev' === environment) {
        Object.assign({ 
            watch: true 
        }, obj);
    }

    return obj;

    function getCompleteEntry(projectConfig) {
        var _completeEntry = Object.assign({}, projectConfig.babel);
        for (var i in _completeEntry) {
            _completeEntry[i] = path.resolve(__dirname, 'project/', _completeEntry[i]);
        }
        return _completeEntry;
    }

    function getProjectPath(projectConfig) {
        var _srcPath = projectConfig.babel;

        for (var i in _srcPath) {
            var _path = _srcPath[i];
            return path.join(__dirname, 'project/', _path, '../../');
        }
    }
}

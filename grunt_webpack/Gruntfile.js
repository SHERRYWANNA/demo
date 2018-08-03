var webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: "prodWebpackConfig",
            dev: "devWebpackConfig"
        }
    });

    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('build', function(project) {
        if (!project) {
            grunt.warn('Need Project Name');
            return;
        }

        var _webpackConfig = new webpackConfig(project),
            _gruntConfig = grunt.config.data;

        _gruntConfig.webpack.prod = _webpackConfig;
        grunt.initConfig(_gruntConfig);
        
        grunt.task.run("webpack:prod");
        // grunt.task.run("NODE_ENV=production grunt build");
    });
    grunt.registerTask('default');

};
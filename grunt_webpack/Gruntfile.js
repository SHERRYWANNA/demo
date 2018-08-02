var webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig)
        }
    });

    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('build', ['webpack:prod']);
    grunt.registerTask('default', ['webpack']);
};
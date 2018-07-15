module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'src/index.js': 'lib/index.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['babel']);
};
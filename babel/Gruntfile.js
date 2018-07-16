module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: false,
                presets: ['env']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.js'],
                    dest: 'dist/',
                    ext:'.js'
                }]
            }
        },
        browserify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: 'index.js',
                    dest: 'lib/',
                    ext:'.js'
                }]
            }
        },
        clean: {
            default: ['dist']
        }
    });

    grunt.registerTask('default', ['babel', 'browserify', 'clean']);
};
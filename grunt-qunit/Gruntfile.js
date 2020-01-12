module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        qunit: {
            options: {
                coverage: {
                    disposeCollector: true,
                    src: ['common/*.js'],
                    instrumentedFiles: 'temp',
                    htmlReport: 'coverage'
                }
            },
            main: ['./test/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-qunit-istanbul');

    grunt.registerTask('test', function() {
        grunt.task.run("qunit");
    });
    grunt.registerTask('default');

};
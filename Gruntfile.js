module.exports = function(grunt) {

    // configuration
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['test/coverage/**/*.js']
            },
            files: {
                src: ['js/**.js']
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },

        concat: {
            js: {
                src: ['js/*.js'],
                dest: 'dist/notFramework.js',
            },
            css: {
                src: ['css/*.css'],
                dest: 'dist/notFramework.css',
            },
        },

        watch: {
            lint: {
                files: '<%= jshint.files.src %>',
                tasks: 'jshint'
            },
        },
        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/sourcemap.map'
                },
                files: {
                    'dist/notFramework.min.js': ['js/*.js']
                }
            }
        }
    });




    // plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // tasks
    grunt.registerTask('build', [/*'jshint',*/ 'concat', 'uglify']);

    grunt.registerTask('develop', ['watch']);


};

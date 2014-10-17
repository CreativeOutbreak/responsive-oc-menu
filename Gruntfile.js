module.exports = function(grunt) {

    // Configuration 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {                    // Task
            dist: {                   // Target
                options: {            // Target options
                    sassDir: ['scss'],
                    cssDir: ['css'],
                    environment: 'production'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'js/menu.min.js': 'js/src/menu.js',
                    'js/enhance.min.js': 'js/src/enhance.js'
                }
            }
        },
        watch: {
            css: {
                files: ['scss/**/*.scss','scss/**/_*.scss','scss/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: true 
                }
           },
           js: {
                files: 'js/src/*.js',
                tasks: ['uglify'],
                options: {
                    spawn: true 
                }
           }


        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-compass');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-perfbudget');

    // Tasks
    grunt.registerTask('default', ['watch']);
    };

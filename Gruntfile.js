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
        perfbudget: {
            default: {
                options: {
                    url: 'http://newint.org',
                    key: 'ab89ad2a371341eba6cd2143b93391b3'
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
        shell: {
            dropcache: {
                command: "sudo touch /var/cache/mod_pagespeed/cache.flush"
            },  
        }, 
        watch: {
            css: {
                files: ['scss/**/*.scss','scss/**/_*.scss','scss/*.scss'],
                tasks: ['compass', 'shell'],
                options: {
                    spawn: true 
                }
           },
           js: {
                files: 'js/src/*.js',
                tasks: ['uglify', 'shell'],
                options: {
                    spawn: true 
                }
           }


        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-compass');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-perfbudget');

    // Tasks
    grunt.registerTask('default', ['watch']);
    };

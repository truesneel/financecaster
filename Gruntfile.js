'use strict';

module.exports = function(grunt) {
  var server;

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['src/app/**/*.js', 'src/server.js', 'Gruntfile.js'],
        tasks: ['jshint','exec'],
        options: {
          interrupt: true,
          livereload: true,
        },
      },
      static: {
        files: ['src/public/scripts/**/*.js'],
        tasks: ['jshint'],
      },
    },
    jshint: {
      options: {
        force: true,
      },
      files: ['src/app/**/*.js', 'src/server.js', 'Gruntfile.js', 'src/public/scripts/**/*.js']
    },
    exec: {
      apidoc: {
        cmd: 'node_modules/apidoc/bin/apidoc -e node_modules/ -e src/public/vendor/ -o src/public/apidoc'
      },
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          cwd: 'src',
          watch: ['app/**/*.js', 'server.js'],
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch', 'nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['jshint', 'exec', 'concurrent:dev']);
};

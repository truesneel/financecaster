/*jslint node: true */
'use strict';

module.exports = function(grunt) {
  var server;

  grunt.initConfig({
    watch: {
      apidoc: {
        files: ['src/app/**/*.js', 'src/server.js', 'Gruntfile.js'],
        tasks: ['exec'],
        options: {
          interrupt: true,
          livereload: true,
        },
      },
      scripts: {
        files: ['src/app/**/*.js', 'src/server.js', 'Gruntfile.js', 'src/public/scripts/**/*.js'],
        tasks: ['jshint','exec'],
        options: {
          interrupt: true,
          livereload: true,
        },
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
          watch: ['app/**/*.js', 'server.js', 'config.ini'],
        }
      },
      syncdb: {
        script: 'server.js',
        options: {
          cwd: 'src',
          env: {
            'FC_DB_FORCE_SYNC': '1'
          },
          watch: ['app/**/*.js', 'server.js'],
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch:scripts', 'nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      },
      syncdb: {
        tasks: ['watch:scripts', 'nodemon:syncdb'],
        options: {
          logConcurrentOutput: true
        }
      },
      apidoc: {
        tasks: ['watch:apidoc', 'nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['jshint', 'concurrent:dev']);
  grunt.registerTask('syncdb', ['jshint', 'concurrent:syncdb']);
  grunt.registerTask('apidoc', ['concurrent:apidoc']);
};

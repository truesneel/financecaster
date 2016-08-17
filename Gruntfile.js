'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          port: 9001,
          base: 'src/public',
          keepalive : true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['connect:server']);
};

module.exports = function(grunt) {
  
  var pck = grunt.file.readJSON('package.json');
  var name = pck.exports || pck.name;
  var build = pck.name + '.js';
  var buildMin = pck.name + '.min.js';
  
  var brwsFiles = {};
  brwsFiles[build] = ['index.js'];

  var uglFiles = {};
  uglFiles[buildMin] = [build];
  

  var config = {
    
    pkg: pck,
    
    browserify: {
      dist: {
        files: brwsFiles
      },
      options: {standalone: name}
    },

    uglify: {
      my_target: {
        files: uglFiles
      }
    },

    // Mocha
    mocha: {
      all: {
        src: ['tests/runner.html'],
      },
      options: {
        run: true
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true
        }
      }
    }


  };

  // load
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // config
  grunt.initConfig(config);

  // tasks
  grunt.registerTask('test', ['connect']);
  grunt.registerTask('default', ['browserify', 'uglify']);

};

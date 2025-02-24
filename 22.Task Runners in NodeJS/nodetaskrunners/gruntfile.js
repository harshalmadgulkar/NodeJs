module.exports = function (grunt) {
  // Configure the tasks
  grunt.initConfig({
    uglify: {
      target: {
        files: {
          // 1. For input1.js and input2.js, concatenate them and minify them.
          'dest/js/main.min.js': ['src/js/input1.js', 'src/js/input2.js'],

          // 2.For all files in the js directory, concatenate and minify them.
          //   'dest/js/main.min.js': ['src/js/*.js'],
        },
      },
    },
  });

  //   Load libraries
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //   Setting up tasks
  grunt.registerTask('default', ['uglify']);
};

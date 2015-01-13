module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');

  grunt.registerTask('fail', function(label) {
    grunt.log.writeln(label);
    return false;
  });

  grunt.registerTask('pass', function(label) {
    grunt.log.writeln(label);
    return true;
  });

  grunt.registerTask('default', [
    'pass:first',
    'continue:on',
    'fail:second',
    'continue:off',
    'fail:third',
    'pass:fourth'
  ]);
};

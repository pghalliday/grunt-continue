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

  // Default task.
  grunt.registerTask('default', [
    'continue:on',
    'pass:first',
    'continue:off',
    'continue:fail-on-warning'
  ]);
};

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
    'pass:first',
    'continue:on',
    'continue:on',
    'continue:on',
    'fail:second',
    'continue:off',
    'fail:third',
    'continue:off',
    'fail:fourth',
    'continue:off',
    'fail:fifth',
    'pass:sixth'
  ]);
};

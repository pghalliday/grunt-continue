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
    'continueOn',
    'continueOn',
    'continueOn',
    'fail:second',
    'continueOff',
    'fail:third',
    'continueOff',
    'fail:fourth',
    'continueOff',
    'fail:fifth',
    'pass:sixth'
  ]);
};

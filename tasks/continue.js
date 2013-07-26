module.exports = function(grunt) {
  grunt.registerTask('continueOn', 'Continue after failing tasks', function() {
    overridden = grunt.config('grunt-continue:overridden') || false;
    if (!overridden) {
      count = grunt.config('grunt-continue:count') || 0;
      if (!count && grunt.option('force')) {
        grunt.config('grunt-continue:overridden', true);
      } else {
        if (!count) {
          grunt.option('force', true);
        }
        grunt.config.set('grunt-continue:count', ++count);
      }
    }
  });

  grunt.registerTask('continueOff', 'Stop continuing after failing tasks', function() {
    overridden = grunt.config('grunt-continue:overridden') || false;
    if (!overridden) {
      count = grunt.config('grunt-continue:count') || 0;
      if (!count) return false;
      grunt.config.set('grunt-continue:count', --count);
      if (!count) {
        grunt.option('force', false);
      }
    }
  });
};

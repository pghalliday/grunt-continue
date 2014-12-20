module.exports = function(grunt) {

  var defaultWarnHandler = grunt.fail.warn;

  function warn(){
    grunt.config.set('grunt-continue:warning-issued', true);
    defaultWarnHandler.apply(grunt, Array.prototype.slice.call(arguments));
  }

  grunt.registerTask('continueOn', 'Continue after failing tasks', function() {

    grunt.fail.warn = warn;
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
    grunt.fail.warn = defaultWarnHandler;
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

  grunt.registerTask('continueFailIfWarningsWereIssued', 'Check to see if there were any failures', function(){
    var warningWasIssued = grunt.config('grunt-continue:warning-issued') || false;
    if(warningWasIssued) {
      grunt.fail.warn('A warning was issued within a continueOn <-> continueOff block');
    }
  });
};

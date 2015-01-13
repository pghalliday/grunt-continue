module.exports = function(grunt) {

    var defaultWarnHandler = grunt.fail.warn;

    function warn(){
        var warnings = grunt.config('grunt-continue:warnings') || [];
        warnings.push(arguments[0]);
        grunt.config.set('grunt-continue:warnings', warnings);
        defaultWarnHandler.apply(grunt, Array.prototype.slice.call(arguments));
    }

    grunt.registerTask('continue:on', 'Continue after failing tasks', function() {
        grunt.warn = grunt.fail.warn = warn;
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

    grunt.registerTask('continue:off', 'Stop continuing after failing tasks', function() {
        grunt.warn = grunt.fail.warn = defaultWarnHandler;
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

    grunt.registerTask('continue:fail-on-warning', 'Check to see if there were any warnings, fail if there were', function(){
        var warnings = grunt.config('grunt-continue:warnings') || null;
        if(warnings) {
            var msg = grunt.util.pluralize(warnings.length, 'A warning has/Warnings have')+' occurred between continue:on and continue:off:\n';
            for(var i = 0, len = warnings.length; i<len; i++) {
                msg += ' - ';
                msg += grunt.util.kindOf(warnings[i]) == 'string'?warnings[i]:JSON.stringify(warnings[i]);
                msg += '\n';
            }
            msg += '\n';
            grunt.warn(grunt.util.normalizelf(msg));
        }
    });
};
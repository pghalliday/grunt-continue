# grunt-continue

[![Build Status](https://travis-ci.org/pghalliday/grunt-continue.png)](https://travis-ci.org/pghalliday/grunt-continue)
[![Dependency Status](https://gemnasium.com/pghalliday/grunt-continue.png)](https://gemnasium.com/pghalliday/grunt-continue)

A grunt plugin to force other tasks to continue after failures

Inspired by and extended from [this](http://stackoverflow.com/a/16972894/2622241) answer by [explunit](http://stackoverflow.com/users/151212/explunit) on StackOverflow

## Usage

Install next to your project's Gruntfile.js with: 

```
$ npm install grunt-continue
```

Here is a simple example gruntfile to show how you might force grunt to continue after failing tests if you have some cleanup that you need to perform afterward

```javascript
module.exports = function(grunt) {

  // Add the grunt-continue tasks
  grunt.loadNpmTasks('grunt-continue');

  // Other tasks and configuration
  ...

  grunt.registerTask('default', [
    'setup',
    'continue:on',
    // All tasks after this point will be run with the force
    // option so that grunt will continue after failures
    'test',
    'continue:off',
    // Tasks after this point will be run without the force
    // option so that grunt exits if they fail
    'cleanup'
  ]);

};
```

`continue:off` does not turn off the continuing if `--force` was specified at the command line.

If `continue:on` is called muliple times `continue:off` must be called that many times in order to stop continuing.

If `continue:off` is called more times than `continue:on` it will fail.

### Checking to see if there were any failures within the block

It is sometimes useful to check if there were any warnings issued by any tasks within `continue:on` and `continue:off`. 
For example, you may run a test within the block and cleanup at the end. In this instance you want the overall build to fail after the cleanup.

To accommodate this add the following task at the end: 

```javascript
module.exports = function(grunt) {

  // Add the grunt-continue tasks
  grunt.loadNpmTasks('grunt-continue');

  // Other tasks and configuration
  ...

  grunt.registerTask('default', [
    'setup',
    'continue:on',
    // All tasks after this point will be run with the force
    // option so that grunt will continue after failures
    'test',
    'continue:off',
    // Tasks after this point will be run without the force
    // option so that grunt exits if they fail
    'cleanup',
    'continue:fail-on-warning'
  ]);

};
  
  grun
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using: 

```
$ npm test
```

### Using Vagrant
To use the Vagrantfile you will also need to install the following vagrant plugins

```
$ vagrant plugin install vagrant-omnibus
$ vagrant plugin install vagrant-berkshelf
```


## License
Copyright &copy; 2013 Peter Halliday  
Licensed under the MIT license.

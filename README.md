# grunt-continue

[![Build Status](https://travis-ci.org/pghalliday/grunt-continue.png)](https://travis-ci.org/pghalliday/grunt-continue)
[![Dependency Status](https://gemnasium.com/pghalliday/grunt-continue.png)](https://gemnasium.com/pghalliday/grunt-continue)

A grunt plugin to force other tasks to continue after failures

## Usage

Install next to your project's Gruntfile.js with: 

```
$ npm install grunt-continue
```

### Running tests

Here is a simple example gruntfile to show how you might force grunt to continue after failing tests if you have seom cleanup that you need to perform after ward

```javascript
module.exports = function(grunt) {

  // Add the grunt-continue tasks.
  grunt.loadNpmTasks('grunt-continue');

  // Other tasks and configuration
  ...

  grunt.registerTask('default', [
    'setup',
    'continueOn',
    // All tasks after this point will be run with the force
    // option so that grunt will continue after failures
    'test',
    'continueOff',
    // Tasks after this point will be run without the force
    // option so that grunt exits if they fail
    'cleanup'
  ]);

};
```

`continueOff` does not turn off the continuing if `--force` was specified at the command line.

If `continueOn` is called muliple times `continueOff` must be called that many times in order to stop continuing.

If `continueOff` is called more times than `continueOn` it will fail.

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

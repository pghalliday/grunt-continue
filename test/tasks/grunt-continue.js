/*jshint loopfunc: true */

var expect = require('chai').expect;
var exec = require('child_process').exec;
var fs = require('fs');

var mergeCoverageData = function(data) {
  // we have to reconstruct the the _$jscoverage data
  // format as it cannot be stringified to JSON with
  // the additional source property added to arrays
  if (typeof global._$jscoverage === 'undefined') {
    global._$jscoverage = {};
  }
  var jscoverage = global._$jscoverage;
  var sourceArrays = data.sourceArrays;
  var callCounts = data.callCounts;
  for (var filename in sourceArrays) {
    var dest = jscoverage[filename];
    var src = callCounts[filename];
    src.source = sourceArrays[filename];
    if (typeof dest === 'undefined') {
      jscoverage[filename] = src;
    } else {
      src.forEach(function(count, index) {
        if (count !== null) {
          dest[index] += count;
        }
      });
    }
  }
};

var execScenario = function(scenario, force, callback) {
  var scenarioDir = __dirname + '/../scenarios/' + scenario;
  var child = exec('node ../grunt.js' + (force ? ' --force' : ''), {cwd: scenarioDir}, function(error, stdout, stderr) {
    // collect coverage data from file if it exists
    // this is because the coverage tool does not
    // really work with child processes so we are
    // giving it a helping hand
    var jscoverageFile = scenarioDir + '/jscoverage.json';
    if (fs.existsSync(jscoverageFile)) {
      mergeCoverageData(JSON.parse(fs.readFileSync(jscoverageFile)));
    }
    callback(error, stdout, stderr);
  });
};

describe('grunt-continue', function() {

  it('should continue when continue is on and fail after continue is turned off', function(done) {
    execScenario('onOff', false, function(error, stdout, stderr) {
      expect(stdout).to.match(/first/);
      expect(stdout).to.match(/second/);
      expect(stdout).to.match(/third/);
      expect(stdout).to.not.match(/fourth/);
      expect(stdout).to.match(/Aborted due to warnings./);
      done();
    });
  });

  it('should continue even after turning continue off if the force flag is already set', function(done) {
    execScenario('onOff', true, function(error, stdout, stderr) {
      expect(stdout).to.match(/first/);
      expect(stdout).to.match(/second/);
      expect(stdout).to.match(/third/);
      expect(stdout).to.match(/fourth/);
      expect(stdout).to.match(/Done, but with warnings./);
      done();
    });
  });

  it('should stop if there is a failure before continue is turned on', function(done) {
    execScenario('onOffWithFailFirst', false, function(error, stdout, stderr) {
      expect(stdout).to.match(/first/);
      expect(stdout).to.not.match(/second/);
      expect(stdout).to.not.match(/third/);
      expect(stdout).to.not.match(/fourth/);
      expect(stdout).to.match(/Aborted due to warnings./);
      done();
    });
  });

  it('should only stop continuing if continue:off has been called as many times as continue:on', function(done) {
    execScenario('nestedOnOff', false, function(error, stdout, stderr) {
      expect(stdout).to.match(/first/);
      expect(stdout).to.match(/second/);
      expect(stdout).to.match(/third/);
      expect(stdout).to.match(/fourth/);
      expect(stdout).to.match(/fifth/);
      expect(stdout).to.not.match(/sixth/);
      expect(stdout).to.match(/Aborted due to warnings./);
      done();
    });
  });
  

  it('should fail if continue:off is called more times than continue:on', function(done) {
    execScenario('tooManyOffs', false, function(error, stdout, stderr) {
      expect(stdout).to.match(/first/);
      expect(stdout).to.match(/second/);
      expect(stdout).to.match(/third/);
      expect(stdout).to.match(/fourth/);
      expect(stdout).to.not.match(/fifth/);
      expect(stdout).to.match(/Aborted due to warnings./);
      done();
    });
  });

  it('should fail if we check if warnings were issued within a continue block', function(done){
    execScenario('failIfWarningsWereIssued', false, function(error, stdout, stderr) {
      expect(stdout).to.match(/second/);
      expect(stdout).to.match(/Aborted due to warnings./);
      done();
    });
  });

  it('should pass if we check if warnings were issued within a continue block - and none were', function(done){
    execScenario('passIfNoWarningsWereIssued', false, function(error, stdout, stderr) {
      expect(stdout).to.match(/first/);
      expect(stdout).to.not.match(/Aborted due to warnings./);
      done();
    });
  });

});
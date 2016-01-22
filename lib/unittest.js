'use strict';

//// IMPORTS

var
    gulp   = require.main.require('gulp'),
    karma  = require('karma'),
    lodash = require('lodash'),
    path   = require('path');

var typescript = require('./typescript');

//// TASKS

function makeUnittest(options) {
  var opt = {
    karma: {
      autoWatch: false,
      browsers: ['PhantomJS'],
      frameworks: ['jasmine'],
      singleRun: true,
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-phantomjs-launcher'
      ],
      files: [
        'node_modules/systemjs/dist/system-polyfills.src.js',
        'node_modules/systemjs/dist/system.src.js',
        { pattern: 'src/**/*.ts', included: false },
        'test/test-main.js'
      ]
    },
    typescript: {
      dest: 'tmp/scripts',
      src: ['typings/**/*.d.ts', 'src/app/**/*.spec.ts'],
      angular: false,
      tsc: {
        outFile: 'tests.js'
      }
    }
  };

  lodash.merge(opt, options);

  var tsTask = typescript(opt.typescript);

  var testTask = function unittest(done) {
    var server = new karma.Server(opt.karma, function (exitCode) {
      if (exitCode !== 0) {
        done('Karma exit code: ' + exitCode);
      } else {
        done()
      }
    });

    server.start();
  };

  var task = gulp.series(tsTask);
  task.displayName = 'unittest';
  task.description = 'Run Karma unit tests';
  task.options = opt;

  return task;
}

//// EXPORTS

module.exports = makeUnittest;

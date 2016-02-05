'use strict';

//// IMPORTS

var gulp          = require.main.require('gulp'),
    karma         = require('karma'),
    path          = require('path');

var typescript = require('./typescript'),
    utils      = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'test:unit',

  // String Gulp will display in help output.
  description: 'Run unit tests.',

  // TypeScript options for compiling tests.
  typescript: {
    name: 'typescript:test',
    description: 'Compile unit test TypeScript to JavaScript',
    src: ['typings/**/*.d.ts', 'src/app/**/*.ts', 'src/app/**/*.spec.ts'],
    dest: 'tmp/scripts',
    angular: false,
    minify: false,
    tsc: {
      outFile: 'tests.js'
    }
  },

  // Karma options.
  karma: {
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-sourcemap-loader'
    ],
    autoWatch: false,
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    singleRun: true,
    preprocessors: {
      '**/*.js': ['sourcemap']
    },
    files: [
      'node_modules/systemjs/dist/system.src.js',
      { pattern: 'src/**/*.ts', included: false },
      'dist/scripts/vendor.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'tmp/scripts/tests.js',
      'test/test-main.js'
    ],
    reporters: ['progress']
  }
};

// Creates a task which compiles and runs unit tests with TypeScript and Karma.
function generateUnitTestTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  var tsTask = typescript(options.typescript);

  var testTask = function unittest(done) {
    var server = new karma.Server(options.karma, done);
    server.start();
  };

  var task = gulp.series(tsTask, testTask);
  task.displayName = options.name;
  task.description = options.description;
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = generateUnitTestTask;

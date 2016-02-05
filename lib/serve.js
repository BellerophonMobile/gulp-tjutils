'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp = require.main.require('gulp');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'serve',

  // String Gulp will display in help output.
  description: 'Start development server',

  // BrowserSync options.
  bs: {
    ghostMode: false,
    open: false,
    server: {
      baseDir: 'dist'
    }
  }
};

// Creates a task which runs a development server.
function generateServeTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  var task = function serve(done) {
    browserSync.init({
      ghostMode: false,
      open: false,
      server: {
        baseDir: 'dist'
      }
    }, done);
  };
  task.displayName = options.name;
  task.description = 'Start development server.';
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = generateServeTask;

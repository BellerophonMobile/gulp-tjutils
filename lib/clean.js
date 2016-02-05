'use strict';

//// IMPORTS

var del  = require('del'),
    util = require('util');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'clean',

  // String Gulp will display in help output.
  description: 'Remove generated files.',

  // Paths to delete.
  paths: ['tmp', 'dist']
};

// Creates a task which deletes the specified directories.
function generateCleanTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  var task = function clean() {
    return del(options.paths);
  };
  task.displayName = options.name;
  task.description = options.description;

  return task;
}

//// EXPORTS

module.exports = generateCleanTask;

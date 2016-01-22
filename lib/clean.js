'use strict';

//// IMPORTS

var del  = require('del'),
    util = require('util');

//// TASKS

function clean(paths) {
  if (util.isNullOrUndefined(paths)) {
    paths = ['tmp', 'dist'];
  }

  if (!Array.isArray(paths)) {
    paths = [paths];
  }

  var task = function clean() {
    return del(paths);
  };
  task.description = 'Remove generated files.';

  return task;
}

//// EXPORTS

module.exports = clean;

'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp');

//// TASKS

function copy(options) {
  if (!Array.isArray(options)) {
    options = [options];
  }

  var tasks = options.map(function (option) {
    return function copy() {
      return gulp.src(option.src)
        .pipe(gulp.dest(option.dest))
        .pipe(browserSync.stream());
    };
  });

  var task = gulp.parallel.apply(gulp, tasks);
  task.displayName = 'copy';
  task.description = 'Copy static files.';
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = copy;

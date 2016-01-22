'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    gulpConcat  = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps');

//// TASKS

function concat(options) {
  if (!Array.isArray(options)) {
    options = [options];
  }

  var tasks = options.map(function (option) {
    return function concat() {
      return gulp.src(option.src)
        .pipe(sourcemaps.init())
        .pipe(gulpConcat(option.out))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(option.dest))
        .pipe(browserSync.stream());
    };
  });

  var task = gulp.parallel.apply(gulp, tasks);
  task.displayName = 'concat';
  task.description = 'Concatenate files.';
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = concat;

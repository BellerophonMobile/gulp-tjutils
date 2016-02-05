'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    gulpConcat  = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'concat',

  // String Gulp will display in help output.
  description: 'Concatenate files.',

  // Concatination jobs.
  jobs: []
}

// Creates a task which concatenates arbitrary files.
function generateConcatTasks(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  // Generate separate gulp streams for each job.
  var tasks = options.jobs.map(function (job) {
    return function concat() {
      return gulp.src(job.src)
        .pipe(sourcemaps.init())
        .pipe(gulpConcat(job.out))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(job.dest))
        .pipe(browserSync.stream());
    };
  });

  // Run all the jobs in parallel.
  var task = gulp.parallel.apply(gulp, tasks);
  task.displayName = options.name;
  task.description = options.description;
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = generateConcatTasks;

'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'concat',

  // String Gulp will display in help output.
  description: 'Copy files.',

  // Copy jobs.
  jobs: []
};

// Creates a task which copies files.
function generateCopyTasks(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  // Generate seperate gulp streams for each job.
  var tasks = options.jobs.map(function (job) {
    return function copy() {
      return gulp.src(job.src)
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

module.exports = generateCopyTasks;

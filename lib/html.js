'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    htmlmin     = require('gulp-htmlmin');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'html',

  // String Gulp will display in help output.
  description: 'Minfiy HTML.',

  // Source files to minify.
  src: 'src/index.html',

  // Output directory.
  dest: 'dist',

  // HTML minifier options.
  htmlmin: {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true
  }
};

// Creates a task which minifies HTML.
function generateHtmlTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  var task = function html() {
    return gulp.src(options.src)
      .pipe(htmlmin(options.htmlmin))
      .pipe(gulp.dest(options.dest))
      .pipe(browserSync.stream());
  };
  task.displayName = options.name;
  task.description = options.description;
  task.options = options;

  return task;
}

///// EXPORTS

module.exports = generateHtmlTask;

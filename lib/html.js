'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    htmlmin     = require('gulp-htmlmin'),
    lodash      = require('lodash');

//// TASKS

function html(options) {
  var opt = {
    src: 'src/index.html',
    dest: 'dist',
    htmlmin: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }
  };

  lodash.merge(opt, options);

  var task = function html() {
    return gulp.src(opt.src)
      .pipe(htmlmin(opt.htmlmin))
      .pipe(gulp.dest(opt.dest))
      .pipe(browserSync.stream());
  };
  task.description = 'Minify HTML.';
  task.options = opt;

  return task;
}

///// EXPORTS

module.exports = html;


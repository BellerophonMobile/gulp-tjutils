'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    imagemin    = require('gulp-imagemin'),
    lodash      = require('lodash');

//// TASKS

function images(options) {
  var opt = {
    src: 'src/images/**/*',
    dest: 'dist/images',
    imagemin: {
      progressive: true,
      interlaced: true,
      multipass: true
    }
  };

  lodash.merge(opt, options);

  var task = function images() {
    return gulp.src(opt.src)
      .pipe(imagemin(opt.imagemin))
      .pipe(gulp.dest(opt.dest))
      .pipe(browserSync.stream());
  };
  task.description = 'Minify images.';
  task.options = opt;

  return task;
}

///// EXPORTS

module.exports = images;

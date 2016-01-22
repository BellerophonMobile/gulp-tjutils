'use strict';

//// IMPORTS

var autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').get('server'),
    gulp         = require.main.require('gulp'),
    lodash       = require('lodash'),
    cssNano      = require('gulp-cssnano'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps');

//// TASKS

function onError(err) {
  console.error('SASS:', err.messageFormatted);
  browserSync.notifyError(err.messageFormatted);

  // Let watch restart cleanly
  this.emit('end');
}

function makeSass(options) {
  var opt = {
    src: ['src/styles/**/*.scss'],
    dest: 'dist/styles',
    autoprefixer: {}
  };

  var task = function compileSass() {
    return gulp.src(opt.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', onError))
      .pipe(autoprefixer(opt.autoprefixer))
      .pipe(cssNano())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(opt.dest))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  };
  task.description = 'Compile SASS to CSS';
  task.options = opt;

  return task;
}

//// EXPORTS

module.exports = makeSass;

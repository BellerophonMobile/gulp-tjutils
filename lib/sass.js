'use strict';

//// IMPORTS

var autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').get('server'),
    gulp         = require.main.require('gulp'),
    cssnano      = require('gulp-cssnano'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'sass',

  // String Gulp will display in help output.
  description: 'Compile SASS to CSS',

  // Source SASS/SCSS files
  src: 'src/styles/**/*.scss',

  // Output directory
  dest: 'dist/styles',

  // Autoprefixer options
  autoprefixer: {}
};

function onError(err) {
  console.error('SASS:', err.messageFormatted);
  browserSync.notifyError(err.messageFormatted);

  // Let watch restart cleanly
  this.emit('end');
}

// Creates a task which compiles SASS/SCSS to CSS.
function generateSassTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  var task = function compileSass() {
    return gulp.src(options.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', onError))
      .pipe(autoprefixer(options.autoprefixer))
      .pipe(cssnano())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(options.dest))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  };
  task.displayName = options.name;
  task.description = options.description;
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = generateSassTask;

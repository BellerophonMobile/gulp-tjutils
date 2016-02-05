'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    imagemin    = require('gulp-imagemin');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'images',

  // String Gulp will display in help output.
  description: 'Minify images',

  // Images to minify.
  src: 'src/images/**/*.{png,svg,jpg}',

  // Destination directory.
  dest: 'dist/images',

  // Minifier options.
  imagemin: {
    progressive: true,
    interlaced: true,
    multipass: true
  }
};

// Creates a task which minifies images.
function generateImageTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  var task = function images() {
    return gulp.src(options.src)
      .pipe(imagemin(options.imagemin))
      .pipe(gulp.dest(options.dest))
      .pipe(browserSync.stream());
  };
  task.displayName = options.name;
  task.description = options.description;
  task.options = options;

  return task;
}

///// EXPORTS

module.exports = generateImageTask;

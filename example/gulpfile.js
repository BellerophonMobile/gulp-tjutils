'use strict';

//// IMPORTS

var gulp = require('gulp'),
    tjutils = require('../../gulp-tjutils');

//// SETUP

var clean = tjutils.clean();

var ts = tjutils.typescript();

var sass = tjutils.sass();

var vendor = tjutils.concat([{
  src: [
    'node_modules/systemjs/dist/system.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-material/angular-material.min.js',
    'node_modules/angular-messages/angular-messages.min.js'
  ],
  out:  'vendor.js',
  dest: 'dist/scripts'
}, {
  src: [
    'node_modules/roboto-fontface/css/roboto-fontface.css',
    'node_modules/angular-material/angular-material.min.css'
  ],
  out:  'vendor.css',
  dest: 'dist/styles'
}]);

var copy = tjutils.copy([
  { src: ['src/*', '!src/index.html'], dest: 'dist'},
  { src: 'node_modules/roboto-fontface/fonts/*', dest: 'dist/fonts' }
]);

var html = tjutils.html();
var images = tjutils.images();
var lint = tjutils.lint();

var build = gulp.series(clean,
  gulp.parallel(lint, html, images, copy, sass, ts, vendor));
build.displayName = 'build';
build.description = 'Compile all assets (JS/SASS/HTML) into deployable website.';

function watch() {
  gulp.watch(sass.options.src, sass);
  gulp.watch(ts.options.src, gulp.series(lint, ts));
  gulp.watch(ts.options.templateSrc, ts);
  gulp.watch(html.options.src, html);
  gulp.watch(images.options.src, images);
  gulp.watch(copy.options.map(x => x.src), copy);
}

var serve = gulp.series(build, tjutils.serve(), watch);
serve.displayName = 'serve';
serve.description = 'Start development server.';

//// TASKS

gulp.task(clean);
gulp.task(serve);
gulp.task(lint);
gulp.task('default', build);

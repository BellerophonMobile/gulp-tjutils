'use strict';

//// IMPORTS

var browserSync   = require('browser-sync').get('server'),
    concat        = require('gulp-concat'),
    gulp          = require.main.require('gulp'),
    htmlmin       = require('gulp-htmlmin'),
    merge2        = require('merge2'),
    ngAnnotate    = require('gulp-ng-annotate'),
    sourcemaps    = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    tsc           = require('gulp-typescript'),
    uglify        = require('gulp-uglify'),
    util          = require('util');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'typescript',

  // String Gulp will display in help output.
  description: 'Compile TypeScript to JavaScript',

  // Directory to write output.
  dest: 'dist/scripts',

  // Source files to include.  Defaults to all type definitions and TypeScript
  // in the app directory, not including unit tests.
  src: [
    'typings/**/*.d.ts',
    '!typings/angularjs/angular-mocks.d.ts',
    'src/app/**/*.ts',
    '!**/*.spec.ts'
  ],

  // Run Angular-specific build processes (ngAnnotate, $templateCache).
  angular: true,

  // When angular = true, gather all templates to minify, bundle, and add to
  // $templateCache.
  templateSrc: ['src/app/**/*.html'],

  // Use WebWorker global TypeScript type definitions.
  webWorker: false,

  // Whether to minify output code.
  minify: true,

  // TypeScript compiler options
  tsc: {
    module: 'system',
    noEmitOnError: true,
    noExternalResolve: true,
    noImplicitAny: true,
    outFile: 'app.js',
    target: 'ES5',
    typescript: require.main.require('typescript')
  },

  // HTML minifier options
  htmlmin: {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true
  },

  // angular-templatecache options
  templateCache: {
    moduleSystem: 'iife',
    module: 'templates',
    standalone: true
  }
};

// Creates a task which compiles, concatenates, and minifies TypeScript code.
// For Angular projects, also bundles templates into $templateCache.
function generateTypescriptTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  if (options.webWorker) {
    // Don't include TypeScript standard library, prepend the WebWorker type
    // definitions to the source array.
    options.tsc.noLib = true;
    utils.prepend(options.src,
        'node_modules/typescript/lib/lib.core.d.ts',
        'node_modules/typescript/lib/lib.webworker.d.ts');
  }

  var project = tsc.createProject(options.tsc);

  var task = function (done) {
    // Set up reporter to send errors to browser
    var reporter = tsc.reporter.defaultReporter();
    reporter.error = function (err) {
      browserSync.notifyError(err.message);
      done(err);
    };

    var pipeline = gulp.src(options.src)
      .pipe(sourcemaps.init())
      .pipe(tsc(project, undefined, reporter));

    if (options.angular) {
      var templatePipeline = gulp.src(options.templateSrc)
        .pipe(htmlmin(options.htmlmin))
        .pipe(templateCache(options.templateCache));

      pipeline = merge2(pipeline.pipe(ngAnnotate()), templatePipeline)
        .pipe(concat(options.tsc.outFile));
    }

    if (options.minify) {
      pipeline = pipeline.pipe(uglify());
    }

    return pipeline
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(options.dest))
      .pipe(browserSync.stream());
  };
  task.displayName = options.name;
  task.description = options.description;
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = generateTypescriptTask;

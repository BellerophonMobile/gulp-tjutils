'use strict';

//// IMPORTS

var browserSync   = require('browser-sync').get('server'),
    concat        = require('gulp-concat'),
    gulp          = require.main.require('gulp'),
    htmlmin       = require('gulp-htmlmin'),
    lodash        = require('lodash'),
    merge2        = require('merge2'),
    ngAnnotate    = require('gulp-ng-annotate'),
    sourcemaps    = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    tsc           = require('gulp-typescript'),
    uglify        = require('gulp-uglify'),
    util          = require('util');

//// TASKS

function typescript(options) {
  var opt = {
    dest: 'dist/scripts',
    src: ['typings/**/*.d.ts', 'src/app/**/*.ts', '!**/*.spec.ts'],
    templateSrc: ['src/app/**/*.html'],
    angular: true,
    webWorker: false,
    tsc: {
      module: 'system',
      noEmitOnError: true,
      noExternalResolve: true,
      noImplicitAny: true,
      outFile: 'app.js',
      target: 'ES5',
      typescript: require.main.require('typescript')
    },
    htmlmin: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    },
    templateCache: {
      moduleSystem: 'iife',
      module: 'templates',
      standalone: true
    }
  };

  lodash.merge(opt, options);

  if (opt.webWorker) {
    opt.tsc.noLib = true;
    if (!Array.isArray(opt.src)) {
      opt.src = [opt.src];
    }
    opt.src.unshift(
      'node_modules/typescript/lib/lib.core.d.ts',
      'node_modules/typescript/lib/lib.webworker.d.ts');
  }

  var project = tsc.createProject(opt.tsc);

  var task = function compileTypescript(done) {
    var reporter = tsc.reporter.defaultReporter();
    reporter.error = function (err) {
      browserSync.notifyError(err.message);
      done(err);
    };

    var pipeline = gulp.src(opt.src)
      .pipe(sourcemaps.init())
      .pipe(tsc(project, undefined, reporter));

    if (opt.angular) {
      var templatePipeline = gulp.src(opt.templateSrc)
        .pipe(htmlmin(opt.htmlmin))
        .pipe(templateCache(opt.templateCache));

      pipeline = merge2(pipeline.pipe(ngAnnotate()), templatePipeline)
        .pipe(concat(opt.tsc.outFile));
    }

    return pipeline
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(opt.dest))
      .pipe(browserSync.stream());
  };
  task.description = 'Compile TypeScript to JavaScript';
  task.options = opt;

  return task;
}

//// EXPORTS

module.exports = typescript;

'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    tslint      = require('gulp-tslint');

var utils = require('./utils');

//// TASKS

const OPTIONS = {
  // String Gulp will display for the generated task.
  name: 'lint:ts',

  // String Gulp will display in help output.
  description: 'Lint TypeScript code.',

  // Files to lint.
  src: 'src/**/*.ts',

  // TSLint options.
  tslint: {
    'class-name': true,
    'curly': true,
    'eofline': true,
    'forin': true,
    'indent': 'spaces',
    'no-debugger': true,
    'no-duplicate-key': true,
    'no-duplicate-variable': true,
    'no-empty': true,
    'no-eval': true,
    'no-shadowed-variable': true,
    'no-trailing-whitespace': true,
    'no-unreachable': true,
    'no-unused-variable': true,
    'no-use-before-declare': true,
    'quotemark': [true, 'single', 'avoid-escape'],
    'radix': true,
    'semicolon': true,
    'trailing-comma': [true, { multiline: 'never', singleline: 'never' }],
    'triple-equals': true
  }
};

// From https://github.com/panuhorsmalahti/gulp-tslint/blob/53a8754dadc57e2742c365236e6280f878cb7df7/index.js#L51
function proseErrorFormat(failure) {
  // line + 1 because TSLint's first line and character is 0
  return failure.name + '[' + (failure.startPosition.line + 1) + ', ' +
    (failure.startPosition.character + 1) + ']: ' + failure.failure;
};

function reporter(output, file, options) {
  browserSync.notifyError(output.map(proseErrorFormat));
}

// Creates a task which lints TypeScript files.
function generateLintTask(overrides) {
  var options = utils.merge(OPTIONS, overrides);

  var task = function lintts() {
    return gulp.src(options.src)
      .pipe(tslint({ configuration: { rules: options.tslint } }))
      .pipe(tslint.report(reporter));
  };
  task.displayName = options.name;
  task.description = options.description;
  task.options = options;

  return task;
}

//// EXPORTS

module.exports = generateLintTask;

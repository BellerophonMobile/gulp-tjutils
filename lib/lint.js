'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp        = require.main.require('gulp'),
    lodash      = require('lodash'),
    tslint      = require('gulp-tslint');

//// TASKS

// From https://github.com/panuhorsmalahti/gulp-tslint/blob/53a8754dadc57e2742c365236e6280f878cb7df7/index.js#L51
function proseErrorFormat(failure) {
  // line + 1 because TSLint's first line and character is 0
  return failure.name + '[' + (failure.startPosition.line + 1) + ', ' +
    (failure.startPosition.character + 1) + ']: ' + failure.failure;
};

function reporter(output, file, options) {
  browserSync.notifyError(output.map(proseErrorFormat));
}

function typescript(options) {
  var opt = {
    src: 'src/**/*.ts',
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

  lodash.merge(opt, options);

  var task = function () {
    return gulp.src(opt.src)
      .pipe(tslint({ configuration: { rules: opt.tslint } }))
      .pipe(tslint.report(reporter));
  };
  task.displayName = 'lint:ts';
  task.description = 'Lint TypeScript code.';
  task.options = opt;

  return task;
}

//var lint = gulp.parallel(typescript);
//lint.displayName = 'lint';
//lint.description = 'Lint JavaScript and TypeScript code.';

//// EXPORTS

module.exports = typescript;
//module.exports.ts = lintts;

'use strict';

//// IMPORTS

var browserSync = require('browser-sync').get('server'),
    gulp = require.main.require('gulp');

//// TASKS

function serve() {
  var task = function startServer(done) {
    browserSync.init({
      ghostMode: false,
      open: false,
      server: {
        baseDir: 'dist'
      }
    }, done);
  };
  task.description = 'Start development server.';

  return task;
}

//// EXPORTS

module.exports = serve;

'use strict';

//// IMPORTS

// Create a BrowserSync instance for the other modules to use.
var browserSync = require('browser-sync').create('server'),
    ansiUp = require('ansi_up'),
    util = require('util');

var clean      = require('./lib/clean'),
    concat     = require('./lib/concat'),
    config     = require('./lib/config'),
    copy       = require('./lib/copy'),
    html       = require('./lib/html'),
    images     = require('./lib/images'),
    lint       = require('./lib/lint'),
    sass       = require('./lib/sass'),
    serve      = require('./lib/serve'),
    typescript = require('./lib/typescript'),
    unittest   = require('./lib/unittest');

//// FUNCTIONS

browserSync.notifyError = function (msg) {
  if (Array.isArray(msg)) {
    msg.forEach(m => console.log(m));
    msg = msg.join('<br>');
  } else {
    console.log(msg);
  }

  if (!util.isString(msg)) {
    msg = msg.toString();
  }

  msg = msg.replace(/\n/g, '<br>');
  browserSync.notify(ansiUp.ansi_to_html(msg), config.notifyTimeout);
};

//// EXPORTS

module.exports = {
  clean:      clean,
  concat:     concat,
  config:     config,
  copy:       copy,
  html:       html,
  images:     images,
  lint:       lint,
  sass:       sass,
  serve:      serve,
  typescript: typescript,
  unittest:   unittest
};

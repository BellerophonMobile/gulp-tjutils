'use strict';

//// IMPORTS

var util = require('util');

//// EXPORTS

module.exports = {
  // Merge nested objects together to create a new object.  Does not modifiy
  // the arguments.
  merge() {
    var args = Array.prototype.slice.call(arguments);
    var result = {};

    for (var arg of args) {
      if (!util.isObject(arg)) {
        continue;
      }

      for (var key of Object.keys(arg)) {
        // Merge objects, not arrays.
        if (util.isObject(result[key]) && !Array.isArray(result[key])) {
          if (util.isObject(arg[key]) && !Array.isArray(arg[key])) {
            result[key] = module.exports.merge(result[key], arg[key]);
          } else {
            result[key] = arg[key];
          }
        } else {
          result[key] = arg[key];
        }
      }
    }

    return result;
  },

  // Append pushes arguments to target, converting it to an array if it isn't
  // already one.
  append(target) {
    var args = Array.prototype.slice.call(arguments);
    if (!Array.isArray(target)) {
      target = [target];
    }
    return target.concat.apply(target, args);
  },

  // Prepend pushes arguments to target, converting it to an array if it isn't
  // already one.
  prepend(target) {
    var args = Array.prototype.slice.call(arguments);
    if (!Array.isArray(target)) {
      target = [target];
    }
    return target.concat.apply(args, target);
  }
};

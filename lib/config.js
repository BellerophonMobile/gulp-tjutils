'use strict';

class Config {
  constructor() {

    this.notifyTimeout = 30000;

    this.paths = {
      dist: 'dist',
      src: 'src/app'
    };
  }

  update(config) {
    for (let k of Object.keys(config)) {
      if (util.isObject(this[k])) {
        Object.assign(this[k], config[k]);
      } else {
        this[k] = config[k];
      }
    }
  }
}

//// EXPORTS

module.exports = new Config();

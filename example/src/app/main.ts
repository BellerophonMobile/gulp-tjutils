import angular from 'angular';

import AppComponent from './AppComponent';
import AppController from './AppController';

angular
  .module('my.app', [
    'ngMaterial',

    'templates'
  ])
  .component('myApp', AppComponent)
  .controller('AppController', AppController);

angular.bootstrap(document, ['my.app'], { strictDi: true });

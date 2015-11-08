'use strict';

/**
 * @ngdoc overview
 * @name fileTaBobineApp
 * @description
 * # fileTaBobineApp
 *
 * Main module of the application.
 */
angular
  .module('fileTaBobineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/page1.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/story-selector', {
        templateUrl: 'views/page2.html',
        controller: 'StoryselectorCtrl',
        controllerAs: 'storyselector'
      })
      .when('/webcam-photo/:id', {
        templateUrl: 'views/page3.html',
        controller: 'WebcamphotoCtrl',
        controllerAs: 'webcamphoto'
      })
      .when('/end', {
        templateUrl: 'views/page4.html',
        controller: 'PrintCtrl',
        controllerAs: 'print'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });

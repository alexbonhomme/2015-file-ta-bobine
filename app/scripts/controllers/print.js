'use strict';

/**
 * @ngdoc function
 * @name fileTaBobineApp.controller:PrintCtrl
 * @description
 * # PrintCtrl
 * Controller of the fileTaBobineApp
 */
angular.module('fileTaBobineApp')
  .controller('PrintCtrl', function ($timeout, $location) {
    var timer = $timeout(function () {
        $location.path('/main');
    }, 10000);

    var vm = this;

    vm.backToStart = function () {
        $timeout.cancel(timer);
        $location.path('/main');
    };
  });

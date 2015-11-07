'use strict';

describe('Controller: StoryselectorCtrl', function () {

  // load the controller's module
  beforeEach(module('fileTaBobineApp'));

  var StoryselectorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoryselectorCtrl = $controller('StoryselectorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StoryselectorCtrl.awesomeThings.length).toBe(3);
  });
});

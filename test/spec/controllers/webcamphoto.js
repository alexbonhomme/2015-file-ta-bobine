'use strict';

describe('Controller: WebcamphotoCtrl', function () {

  // load the controller's module
  beforeEach(module('fileTaBobineApp'));

  var WebcamphotoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebcamphotoCtrl = $controller('WebcamphotoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebcamphotoCtrl.awesomeThings.length).toBe(3);
  });
});

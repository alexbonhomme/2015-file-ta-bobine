'use strict';

describe('Controller: PrintCtrl', function () {

  // load the controller's module
  beforeEach(module('fileTaBobineApp'));

  var PrintCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrintCtrl = $controller('PrintCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PrintCtrl.awesomeThings.length).toBe(3);
  });
});

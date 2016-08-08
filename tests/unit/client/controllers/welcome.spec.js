describe('WelcomeCtrl tests', function() {
  'use strict';
  var scope,
    controller,
    Events;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('WelcomeCtrl', {
      $scope: scope

    });
    Events = $injector.get('Events');
    scope.init();
  }));



  it('should set some variables', function() {
    expect(scope.todos).toBeTruthy();
    expect(scope.events).toBeTruthy();
  });
});

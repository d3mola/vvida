describe('EventCtrl tests', function() {
  'use strict';
  var scope, controller;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('FooterCtrl', {
      $scope: scope
    });
  }));

  it('should define scope.discover', function() {
    expect(scope.discover).toBeDefined();
    expect(typeof scope.discover).toBe('object');
    expect(scope.discover instanceof Array).toBe(true);
    expect(scope.discover.length).toBe(6);
  });

  it('should define scope.business', function() {
    expect(scope.business).toBeDefined();
    expect(typeof scope.business).toBe('object');
    expect(scope.business instanceof Array).toBe(true);
    expect(scope.business.length).toBe(6);
  });

  it('should define scope.about', function() {
    expect(scope.about).toBeDefined();
    expect(typeof scope.about).toBe('object');
    expect(scope.about instanceof Array).toBe(true);
    expect(scope.about.length).toBe(6);
  });

});

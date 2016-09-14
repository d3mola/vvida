

describe('HomeCtrl tests', function() {
  'use strict';
  var scope,
    controller;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should define header_image', function() {
    expect(scope.header_image).toBeDefined();
    expect(typeof scope.header_image).toBe('string');
  });

  it('should define events', function() {
    expect(scope.recentEvents).toBeDefined();
    expect(scope.popularEvents).toBeDefined();
    expect(typeof scope.recentEvents).toBe('object');
    expect(typeof scope.popularEvents).toBe('object');
  });

  it('should define reviews', function() {
    expect(scope.reviews).toBeDefined();
    expect(typeof scope.reviews).toBe('object');
  });

});

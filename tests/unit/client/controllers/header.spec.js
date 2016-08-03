describe('HeaderCtrl tests', function() {
  'use strict';
  var scope,
    controller,
    Users = {
      logout: function(cb) {
        if (scope.currentUser) {
          cb(null, true);
        } else {
          cb(true, null);
        }
      }
    },
    state,
    Auth;
  beforeEach(function() {
    module('vvida');
  });

  beforeAll(function() {
    var dummyElement = document.createElement('div');
    sinon.stub(document, 'querySelector').returns(dummyElement);
  });

  afterAll(function() {
    document.querySelector.restore();
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('HeaderCtrl', {
      $scope: scope,
      Users: Users
    });
    Auth = $injector.get('Auth');
    state = $injector.get('$state');
  }));

  it('should define and call Users.logout', function() {
    scope.currentUser = 1;
    spyOn(Users, 'logout').and.callThrough();
    spyOn(Auth, 'logout').and.callThrough();
    spyOn(state, 'go').and.callThrough();
    scope.logout();
    expect(Users.logout).toHaveBeenCalled();
    expect(Auth.logout).toHaveBeenCalled();
    expect(state.go).toHaveBeenCalled();
  });

  it('should define and call Users.logout', function() {
    scope.currentUser = null;
    spyOn(Users, 'logout').and.callThrough();
    spyOn(Auth, 'logout').and.callThrough();
    spyOn(state, 'go').and.callThrough();
    spyOn(console, 'log').and.callThrough();
    scope.logout();
    expect(Users.logout).toHaveBeenCalled();
    expect(Auth.logout).not.toHaveBeenCalled();
    expect(state.go).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });

});

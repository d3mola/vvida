describe('LoginCtrl tests', function() {
  'use strict';
  var scope,
    Users = {
      login: function(user, cb) {
        cb(!user, {
          name: 3,
          picture_url: 8
        });
      },
      save: function(user, cb, cbb) {
        cb(user);
        cbb({
          data: {
            error: 'this is bad'
          }
        });
      }
    },
    state,
    Auth,
    Utils,
    controller;

  beforeEach(function() {
    module('vvida');
  });


  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('LoginCtrl', {
      $scope: scope,
      Users: Users
    });
    Auth = $injector.get('Auth');
    state = $injector.get('$state');
    Utils = $injector.get('Utils');
  }));

  it('should call the login function in the Users service', function() {
    spyOn(Users, 'login').and.callThrough();
    spyOn(Auth, 'setToken');
    spyOn(state, 'go');
    scope.user = true;
    scope.login();
    expect(Users.login).toBeDefined();
    expect(Users.login).toHaveBeenCalled();
    expect(Auth.setToken).toHaveBeenCalled();
    expect(state.go).toHaveBeenCalled();
    expect(scope.currentUser).toBeDefined();
  });

  it('should call the login and fail', function() {
    spyOn(Users, 'login').and.callThrough();
    spyOn(Auth, 'setToken');
    spyOn(state, 'go');
    spyOn(Utils, 'toast');
    scope.user = null;
    scope.login();
    expect(Users.login).toBeDefined();
    expect(Users.login).toHaveBeenCalled();
    expect(Auth.setToken).not.toHaveBeenCalled();
    expect(state.go).not.toHaveBeenCalled();
    expect(scope.currentUser).not.toBeDefined();
    expect(Utils.toast).toBeDefined();
  });

  it('should call the save function in the Users service', function() {
    spyOn(Users, 'save').and.callThrough();
    spyOn(Auth, 'setToken');
    spyOn(state, 'go');
    scope.user = {
      passwordSignup: 'Password1234',
      confirmPassword: 'Password1234'
    };
    scope.signup();
    expect(Users.save).toHaveBeenCalled();
    expect(Auth.setToken).toHaveBeenCalled();
    expect(state.go).toHaveBeenCalled();
    expect(scope.currentUser).toBeDefined();
  });

  it('should reject short passwords', function() {
    spyOn(Utils, 'toast');
    scope.user = {
      passwordSignup: 'Pass',
      confirmPassword: 'Pass'
    };
    scope.signup();
    expect(Utils.toast).toBeDefined();
    expect(Utils.toast).toHaveBeenCalled();
    expect(typeof Utils.toast).toBe('function');
  });

  it('should ensure password is alphanumeric', function() {
    spyOn(Utils, 'toast');
    scope.user = {
      passwordSignup: 'Passworder',
      confirmPassword: 'Passworder'
    };
    scope.signup();
    expect(Utils.toast).toBeDefined();
    expect(Utils.toast).toHaveBeenCalled();
  });

  it('should ensure password as both case characters', function() {
    spyOn(Utils, 'toast');
    scope.user = {
      passwordSignup: 'password1234',
      confirmPassword: 'password1234'
    };
    scope.signup();
    expect(Utils.toast).toBeDefined();
    expect(Utils.toast).toHaveBeenCalled();
  });


});

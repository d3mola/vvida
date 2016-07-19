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
  }));

  it('should return a state', function () {
    spyOn(state, 'go');
    state.go('login');
    expect(state.go).toHaveBeenCalledWith('login');
  });


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
    scope.user = null;
    scope.login();
    expect(Users.login).toBeDefined();
    expect(Users.login).toHaveBeenCalled();
    expect(Auth.setToken).not.toHaveBeenCalled();
    expect(state.go).not.toHaveBeenCalled();
    expect(scope.currentUser).not.toBeDefined();
    expect(scope.messageLogin).toBeDefined();
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
    scope.user = {
      passwordSignup: 'Pass',
      confirmPassword: 'Pass'
    };
    scope.signup();
    expect(scope.messageSignup).toBeDefined();
    expect(scope.messageSignup).
    toEqual('Your password needs to have a length greater than 8 characters');
    expect(typeof scope.messageSignup).toBe('string');
  });

  it('should ensure password is alphanumeric', function() {
    scope.user = {
      passwordSignup: 'Passworder',
      confirmPassword: 'Passworder'
    };
    scope.signup();
    expect(scope.messageSignup).toBeDefined();
    expect(scope.messageSignup).
    toEqual
    ('Your password need to contain both numbers and non-word characters');
  });

  it('should ensure password as both case characters', function() {
    scope.user = {
      passwordSignup: 'password1234',
      confirmPassword: 'password1234'
    };
    scope.signup();
    expect(scope.messageSignup).toBeDefined();
    expect(scope.messageSignup).toEqual
    ('Your password should contain uppercase and lower characters');
  });


});

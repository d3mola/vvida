describe('Users Service Test', function() {
  'use strict';
  beforeEach(function() {
    module('vvida');
  });

  var Users, $http, $httpBackend;
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/users/session')
      .respond(200, [{
        res: 'res'
      }]);
    $httpBackend.when('GET', 'views/home.html')
      .respond(200, [{
        res: 'res'
      }]);
    $http = $injector.get('$http');
    Users = $injector.get('Users');
  }));

  describe('Users unit tests', function() {
    it('login should be a function', function() {
      expect(Users.login).toBeDefined();
      expect(typeof Users.login).toBe('function');
    });

    it('login should call $http.success on status 200', function() {
      $httpBackend.when('POST', '/api/users/login')
        .respond(200, {
          res: 'res'
        });
      var cb = sinon.spy();
      Users.login({
        user: 'user'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('login should call $http.error on status 500', function() {
      $httpBackend.when('POST', '/api/users/login')
        .respond(500, {
          err: 'err'
        });
      var cb = sinon.spy();
      Users.login({
        user: 'user'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].err).toBe('err');
    });

    it('session should be a function', function() {
      expect(Users.session).toBeDefined();
      expect(typeof Users.session).toBe('function');
    });

    it('logout should be a function', function() {
      expect(Users.logout).toBeDefined();
      expect(typeof Users.logout).toBe('function');
    });

    it('logout should call $http.success on status 200', function() {
      $httpBackend.when('GET', '/api/users/logout')
        .respond(200, {
          res: 'res'
        });
      var cb = sinon.spy();
      Users.logout(cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('logout should call $http.error on status 500', function() {
      $httpBackend.when('GET', '/api/users/logout')
        .respond(500, {
          err: 'err'
        });
      var cb = sinon.spy();
      Users.logout(cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].err).toBe('err');
    });

    it('reviews should be a function', function() {
      expect(Users.reviews).toBeDefined();
      expect(typeof Users.reviews).toBe('function');
    });

    it('reviews should call $http.success on status 200', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/reviews/,
          undefined, undefined, ['id'])
        .respond(200, {
          res: 'res'
        });
      var cb = sinon.spy();
      Users.reviews({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('reviews should call $http.error on status 500', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/reviews/,
          undefined, undefined, ['id'])
        .respond(500, {
          err: 'err'
        });
      var cb = sinon.spy();
      Users.reviews({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].err).toBe('err');
    });

    it('reviewsCount should be a function', function() {
      expect(Users.reviewsCount).toBeDefined();
      expect(typeof Users.reviewsCount).toBe('function');
    });

    it('reviewsCount should call $http.success on status 200', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/reviews\/no/,
          undefined, undefined, ['id'])
        .respond(200, {
          res: 'res'
        });
      var cb = sinon.spy();
      Users.reviewsCount({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('reviewsCount should call $http.error on status 500', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/reviews\/no/,
          undefined, undefined, ['id'])
        .respond(500, {
          err: 'err'
        });
      var cb = sinon.spy();
      Users.reviewsCount({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].err).toBe('err');
    });

    it('events should be a function', function() {
      expect(Users.events).toBeDefined();
      expect(typeof Users.events).toBe('function');
    });

    it('events should call $http.success on status 200', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/events/,
          undefined, undefined, ['id'])
        .respond(200, {
          res: 'res'
        });
      var cb = sinon.spy();
      Users.events({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('events should call $http.error on status 500', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/events/,
          undefined, undefined, ['id'])
        .respond(500, {
          err: 'err'
        });
      var cb = sinon.spy();
      Users.events({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].err).toBe('err');
    });

    it('eventsCount should be a function', function() {
      expect(Users.eventsCount).toBeDefined();
      expect(typeof Users.eventsCount).toBe('function');
    });

    it('eventsCount should call $http.success on status 200', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/events\/no/,
          undefined, undefined, ['id'])
        .respond(200, {
          res: 'res'
        });
      var cb = sinon.spy();
      Users.eventsCount({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('eventsCount should call $http.error on status 500', function() {
      $httpBackend.whenGET(/\/api\/users\/(.+)\/events\/no/,
          undefined, undefined, ['id'])
        .respond(500, {
          err: 'err'
        });
      var cb = sinon.spy();
      Users.eventsCount({
        id: 'id'
      }, cb);
      $httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].err).toBe('err');
    });


  });
});

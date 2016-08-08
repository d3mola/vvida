	angular.module('vvida.services')
  .factory('Users', ['$resource', '$http', function($resource, $http) {
    var obj = $resource('/api/users/:id', {
      id: '@id'
    }, {
      update: {
        // this method issues a PUT request
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    obj.login = function(user, cb) {
      $http.post('/api/users/login', user).success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.session = function(cb) {
      $http.get('/api/users/session').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.logout = function(cb) {
      $http.get('/api/users/logout').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.reviews = function(user, cb) {
      $http.get('/api/users/' + user.id + '/reviews').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.reviewsCount = function(user, cb) {
      $http.get('/api/users/' + user.id + '/reviews/no').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.events = function(user, cb) {
      $http.get('/api/users/' + user.id + '/events').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.eventsCount = function(user, cb) {
      $http.get('/api/users/' + user.id + '/events/no').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    return obj;
  }]);

angular.module('vvida.services')
  .factory('Items', ['$resource', '$http', function($resource, $http) {
    var obj = $resource('/api/items/:id', {
      id: '@id'
    }, {
      update: {
        // this method issues a PUT request
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });


    obj.popularProducts = function(cb) {
      $http.get('/api/items/popular').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    return obj;
  }]);

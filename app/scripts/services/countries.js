angular.module('vvida.services')
  .service('Countries', ['$http', function($http) {
    this.all = function(cb) {
      $http.get('/api/countries').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };
  }]);

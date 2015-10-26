angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$cookies', '$state', 'Users', function($rootScope, $scope, $cookies, $state, Users) {
    // login
    $scope.login = function() {
      Users.login($scope.user, function(err, res) {
        console.log('Err: ', err, 'Res ', res);
        if (!err) {
          var storeUser = {
            id: res.id,
            firstname: res.firstname,
            lastname: res.lastname,
            pictureUrl: res.picture_url,
            email: res.email
          };
          $cookies.put('vvidaUserPersisted', JSON.stringify(storeUser));
          $rootScope.currentUser = $cookies.get('vvidaUserPersisted');
          $state.go('home');
        } else {
          $scope.message = err.error || err;
        }
      });
    };
    // signup
    $scope.signup = function() {
      Users.save($scope.user, function(err, user) {
        console.log(user, err);
      });
    };
  }]);

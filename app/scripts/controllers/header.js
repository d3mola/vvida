angular.module('vvida.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', 'Users', 'Auth',
    function($rootScope, $scope, $state, Users, Auth) {
      var toolbar;

      function solidify() {
        var scroll = window.pageYOffset || document.documentElement.scrollTop;
        var opacity = scroll / 150;

        toolbar.style
          .backgroundColor = 'RGBA(249, 191, 59,' + opacity + ')';
      }

      var transparentScrollHeader = function() {
        toolbar = document.querySelector('md-toolbar.navbar');

        $scope.showSearch = $state.current.name !== 'home';

        if (!$scope.showSearch) {
          toolbar.style
            .backgroundColor = 'RGBA(249, 191, 59, 0)';
          
          solidify();
          window.addEventListener('scroll', solidify, false);
        } else {
          window.removeEventListener('scroll', solidify, false);
          
          toolbar.style
            .backgroundColor = 'RGBA(249, 191, 59, 1)';
        }
      };

      transparentScrollHeader();

      $rootScope.$on('$stateChangeSuccess', transparentScrollHeader);

      $scope.showSearch = false;

      $scope.logout = function() {
        Users.logout(function(err, res) {
          if (!err) {
            delete $rootScope.currentUser;
            Auth.logout();
            $state.go('login');
          } else {
            console.log(err, res);
          }
        });
      };
    }
  ]);

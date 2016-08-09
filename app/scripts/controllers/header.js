angular.module('vvida.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', 'Users', 'Auth',
    function($rootScope, $scope, $state, Users, Auth) {
      var mainContent,
        toolbar;

      function solidify() {
        var scroll = mainContent.scrollTop;
        var opacity = scroll / 150;

        toolbar.style
          .backgroundColor = 'RGBA(249, 191, 59,' + opacity + ')';
      }

      var transparentScrollHeader = function() {
        toolbar = document.querySelector('md-toolbar.navbar');
        mainContent = document.querySelector('md-content.main-md-content');
        
        $scope.showSearch = $state.current.name !== 'home';

        if (!$scope.showSearch) {
          toolbar.style
            .backgroundColor = 'RGBA(249, 191, 59, 0)';
          solidify();
          mainContent.addEventListener('scroll', solidify, false);
        } else {
          mainContent.removeEventListener('scroll', solidify, false);
          toolbar.style
            .backgroundColor = 'RGBA(249, 191, 59, 1)';
        }
      };

      $rootScope.$on('$stateChangeSuccess', function() {
        setTimeout(function() {
          transparentScrollHeader();
        }, 0);
      });

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

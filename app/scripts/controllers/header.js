angular.module('vvida.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', 'Users', 'Auth',
    function($rootScope, $scope, $state, Users, Auth) {
      var mainContent,
        transparentHeader,
        toolbar,
        userUrl = /user\/\d/;

      function solidify() {
        var scroll = mainContent.scrollTop;
        var opacity = scroll / 150;

        toolbar.style
          .backgroundColor = 'RGBA(249, 191, 59,' + opacity + ')';
      }

      function changeHeader() {
        if (userUrl.test(window.location.pathname)) {
          toolbar.classList.add('header-overlay');
          toolbar.style.borderBottom = '5px rgb(249, 191, 59) solid';
          toolbar.style.height = '98px';
          toolbar.style.backgroundRepeat = 'no-repeat';
          toolbar.style.backgroundSize = '100%';
          toolbar.style.backgroundPositionY = '-310px';
        } else {
          toolbar.style.borderBottom = 'none';
          toolbar.style.height ='60px';
          toolbar.style.backgroundImage = 'none';
          toolbar.classList.remove('header-overlay');
        }

      }

      var transparentScrollHeader = function() {
        toolbar = document.querySelector('md-toolbar.navbar');
        mainContent = document.querySelector('md-content.main-md-content');
        transparentHeader = ['home', 'login', 'signup'];

        if(transparentHeader.indexOf($state.current.name) === -1 ) {
          $scope.showSearch = true;
        }
        else{
          $scope.showSearch = false;
        }

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

        changeHeader();

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
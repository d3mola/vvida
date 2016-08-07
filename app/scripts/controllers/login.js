(function() {
  'use strict';

  angular.module('vvida.controllers')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$state',
      '$window', 'Users', 'Auth', 'Utils',
      function($rootScope, $scope, $state, $window, Users, Auth, Utils){
        // login
        $scope.login = function() {
          Users.login($scope.user, function(err, res) {
            if (!err) {
              Auth.setToken(res.token);
              $rootScope.currentUser = res;
              $state.go('userProfile', {
                id: $rootScope.currentUser.id
              });
            } else {
              Utils.toast(err.error || err || err[0].message);
            }
          });
        };

        //  signup
        $scope.signup = function() {
          var validationResult = validate($scope.user);
          if (validationResult.is_valid) {
            var user = {
              email: $scope.user.emailSignup,
              password: $scope.user.passwordSignup
            };

            Users.save(user, function(res) {
              Auth.setToken(res.token);
              $rootScope.currentUser = res;
              $state.go('userProfile', {
                id: $rootScope.currentUser.id
              });
            }, function(err) {
              if (err.data.error === 'Validation error'){
                Utils.toast('Email already exists');
              } else {
                Utils.toast('An error occurred, try again later');

              }
            });
          } else {
            Utils.toast(validationResult.message);

          }
        };

        function validate(signUpDetails) {
          var obj = {};
          if (signUpDetails.passwordSignup.trim().length < 8) {
            obj.message =
              'Your password needs to have a length greater than 8 characters';
          } else if (!/\d/.test(signUpDetails.passwordSignup.trim()) ||
            !/\w/.test(signUpDetails.passwordSignup.trim())) {
            obj.message =
              'Your password need to contain both numbers ' +
              'and non-word characters';
          } else if (!/[A-Z]/.test(signUpDetails.passwordSignup.trim()) ||
            !/[a-z]/.test(signUpDetails.passwordSignup.trim())) {
            obj.message =
              'Your password should contain uppercase and lower characters';
          } else if (signUpDetails.passwordSignup.trim() !=
            signUpDetails.confirmPassword.trim()) {
            obj.message = 'Passwords do not match.';
          } else if (signUpDetails.passwordSignup.trim() ===
            signUpDetails.confirmPassword.trim()) {
            obj.is_valid = true;
          }
          return obj;


        }

        $scope.facebook = function() {
          $window.location.href = '/auth/facebook';
        };

        $scope.google = function() {
          $window.location.href = '/auth/google';
        };
      }
    ]);
})();

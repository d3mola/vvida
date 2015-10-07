require('./../services/services');
angular.module('vvida.controllers')
  .controller('HomeCtrl', ['$scope', function($scope) {
    $scope.header_image = 'images/vvidaLogo.png';
  }])
  .controller('LoginCtrl', ['$scope', function($scope) {
    $scope.userData = {
      firstName :'',
      lastName :'',
      email :'',
      password :''
    };
  }])
  .controller('AboutCtrl', ['$scope', 'Utils', function($scope, Utils) {
    $scope.openDialog = function(event) {
      Utils.dialog('My name is a String', 'Hey there, I\'m a dialog', event,
        function() {
          console.log('Ok button has been clicked!');
        });
    };
    $scope.openToast = function() {
      Utils.toast('Hey there!');
    };
  }]);

angular.module('vvida.controllers')
  .controller('UserPicturesCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    if ($rootScope.currentUser) {
      $scope.arrayNo = function(num) {
        var array = new Array(num);
        for (var x = 0; x < array.length; x++) {
          array[x] = 1;
        }
        return array;
      };
    }
  }]);
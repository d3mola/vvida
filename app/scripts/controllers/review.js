angular.module('vvida.controllers')
  .controller('ReviewCtrl', ['$scope', 'Reviews', function($scope, Reviews) {

    $scope.cities = ['NRB', 'KSM', 'MSA', 'NKR'];


    $scope.addItemReview = function() {
      $scope.itemReview.itemId = $stateParams.id;
      Reviews.save($scope.itemReview, function(review) {
        console.log(review);
        if (review) {
          $state.go($state.current, {}, {
            reload: true
          });
        }
      });
    };

  }]);

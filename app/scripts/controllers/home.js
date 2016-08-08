angular.module('vvida.controllers')
  .controller('HomeCtrl', [
    '$scope',
    '$q',
    '$state',
    '$timeout',
    'Events',
    'Reviews',
    function($scope, $q, $state, $timeout, Events, Reviews) {

      $scope.header_image = 'images/vvidaLogo.png';

      // Get all reviews
      $scope.reviews = Reviews.query();

      // Get all the events
      $scope.events = Events.query();

      $scope.timeLeft = function (startTime) {
        return moment(new Date(startTime)).from(new Date());
      };
      // Get reviews from the db
      $scope.reviews = Reviews.query();
    }
  ]);



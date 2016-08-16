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
      $scope.recentEvents = [];
      $scope.popularEvents = [];

      // Get recent events
      Events.recentEvents(function (err, events) {
        events.forEach(function (event) {
          if(event.Images.length) {
           event.Images[0].img_url = httpsConversion(event.Images[0].img_url);
          }
        });
        $scope.recentEvents = events;
      });

      // Get popular events
      Events.popularEvents(function (err, events) {
        events.forEach(function (event) {
          if(event.Images.length) {
           event.Images[0].img_url = httpsConversion(event.Images[0].img_url);
          }
        });
        $scope.popularEvents = events;
      });

      $scope.timeLeft = function (startTime) {
        return moment(new Date(startTime)).from(new Date());
      };
      //Regex to replace http with https
      function httpsConversion(data) {
        return data.replace(/http:/gi, 'https:');
      }

      // Get reviews from the db
      $scope.reviews = Reviews.query();

    }
  ]);

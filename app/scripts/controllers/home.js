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

      $scope.imgsToHttps = function(events) {
        events.forEach(function (event) {
          if(event.Images.length) {
           var img_url = event.Images[0].img_url;
           event.Images[0].img_url = img_url.replace(/http:/gi, 'https:');
          }
        });

        return events;
      };

      // Get recent events
      Events.recentEvents(function (err, events) {
        $scope.recentEvents = $scope.imgsToHttps(events);
      });

      // Get popular events
      Events.popularEvents(function (err, events) {
        $scope.popularEvents = $scope.imgsToHttps(events);
      });

      $scope.timeLeft = function (startTime) {
        return moment(new Date(startTime)).from(new Date());
      };

      // Get reviews from the db
      $scope.reviews = Reviews.query();

    }
  ]);

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

      // Get all the events
      $scope.events = Events.query(function (events) {
        events.forEach(function (event) {
          if(event.Images.length) {
           event.Images[0].img_url = httpsConversion(event.Images[0].img_url);
          }
        });
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

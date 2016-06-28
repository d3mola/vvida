(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams',
      '$mdSidenav', 'Utils', 'Events', 'Categories', 'Reviews',
      function($scope, $state, $stateParams, $mdSidenav,
        Utils, Events, Categories, Reviews) {

        // initialize state data
        $scope.init = function() {
          // get all categories
          $scope.categories = Categories.query({
            type: 'Event'
          });

          $scope.eventReview = {};
          // get selected category id
          $scope.categoryId = $stateParams.catId;

          // load recent events
          Events.query({
            filter: 'recent'
          }, function(res) {
            $scope.recentEvents = res;
          }, function(err) {
            console.log(err);
          });
          // get popular events
          Events.popularEvents(function(err, res) {
            if (err) {
              $scope.errMessage = 'Error Encountered';
            } else {
              $scope.popularEvents = res;
            }
          });

          $scope.$watch(function() {
              return $state.current.name;
            },
            function(name) {
              if (name === 'events') {
                $scope.nextView = false;
                $scope.popularEvent = false;
                return;
              }

              if (name === 'popularEvents') {
                $scope.nextView = true;
                $scope.popularEvent = true;
                return;
              }

              $scope.nextView = true;
              $scope.popularEvent = false;

            });
        };

        $scope.close = function() {
          $mdSidenav('evcatNav').close();
        };

        $scope.toggleSidenav = function() {
          $mdSidenav('evcatNav').toggle();
        };

        $scope.getEvent = function() {
          $scope.eventId = $stateParams.id;
          Events.get({
            id: $stateParams.id
          }, function(event) {
            $scope.event = event;
          });
        };

        // format date data
        $scope.getTime = function(eventTime) {
          return Utils.parseTime(eventTime);
        };

        $scope.range = function(n) {
          return new Array(n);
        };

        $scope.rate = function(n) {
          $scope.eventReview.rating = n;
        };

        $scope.addEventReview = function() {
          $scope.eventReview.eventId = $stateParams.id;
          Reviews.save($scope.eventReview, function(review) {
            if (review) {
              $scope.event.Reviews.push(review);
              $scope.eventReview = {};
            }
          });
        };

        $scope.averageReview = function(eventReviews) {
          if (eventReviews) {
            var sum = 0;
            eventReviews.forEach(function(review) {
              sum += review.rating;
            });
            return Math.round(sum / eventReviews.length) || 0;
          }
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
        };

        $scope.init();
      }
    ]);
})();

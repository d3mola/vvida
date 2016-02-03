(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams', '$filter',
      'Utils', 'Events', 'Reviews',
      function($scope, $state, $stateParams, $filter,
        Utils, Events, Reviews) {

        // initialize state data
        $scope.init = function() {
          // view all events
          if ($stateParams.view) {
            $scope.page = parseInt($stateParams.page) || 0;
            $scope.viewEvents($scope.page);
            $scope.viewType = $stateParams.view || 'grid';
          }
          // view an event details
          else if ($stateParams.id) {
            $state.go('viewEvent', {
              id: $stateParams.id
            });
          }
          // view the main page
          else {
            Events.query(function(result) {
              $scope.loadEvents = result;
              $state.go('events.page');
            });
          }
        };

        $scope.setViewType = function(type) {
          $scope.viewType = type;
          $scope.updateStateParams();
        };

        $scope.updateStateParams = function() {
          $state.go('events.all', {
            page: $scope.page,
            view: $scope.viewType
          });
        };

        // event list to be updated for pagination
        $scope.viewEvents = function(page) {
          var pageNum = parseInt(page);
          pageNum = (pageNum <= 0) ? 1 : pageNum;
          $scope.limit = 3;

          $scope.loadEvents = Events.query({
            limit: $scope.limit,
            page: pageNum - 1
          });
        };

        // redirect to pages
        $scope.prevEvents = function() {
          $scope.page = parseInt($state.params.page) - 1;
          $scope.viewEvents($scope.page);
          $scope.updateStateParams();
        };

        $scope.nextEvents = function() {
          $scope.page = parseInt($state.params.page) + 1;
          $scope.viewEvents($scope.page);
          $scope.updateStateParams();
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
        $scope.parseTime = function(eventTime) {
          return {
            day: $filter('date')(eventTime, 'EEEE dd MMM yyyy'),
            time: $filter('date')(eventTime, 'hh:mm a')
          };
        };

        $scope.range = function(n) {
          return new Array(n);
        };

        $scope.rate = function(n) {
          $scope.itemReview.rating = n;
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
            var sum = 0,
              count = 0;
            eventReviews.forEach(function(review) {
              sum += review.rating;
              count += 1;
            });
            return Math.round(sum / count) || 0;
          }
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
        };

        $scope.init();
      }
    ]);
})();

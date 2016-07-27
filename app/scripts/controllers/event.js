(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$rootScope', '$scope', '$state', '$stateParams',
      '$mdSidenav', 'Utils', 'Events', 'Categories', 'Reviews',
      function($rootScope, $scope, $state, $stateParams, $mdSidenav,
        Utils, Events, Categories, Reviews) {

        // initialize state data
        $scope.init = function() {
          // Hides the error message container
          $scope.showError = false;
          if ($rootScope.currentUser) {
            $scope.userId = $rootScope.currentUser.id;
          } else {
            $scope.userId = null;
          }
          // Decides which button to display during edit
          $scope.editing = false;
          $scope.currentUserReview = {};
          $scope.haveReviewed = false;
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
            for (var i = 0; i < event.Reviews.length; i++) {
              if (event.Reviews[i].user_id === $scope.userId) {
                $scope.currentUserReview = event.Reviews[i];
                $scope.haveReviewed = true;
                $scope.event.Reviews.splice(i, 1);
                break;
              }
            }
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
          $scope.showError = false;
          $scope.eventReview.eventId = $stateParams.id;
          Reviews.save($scope.eventReview, function(review) {
            if (!review.error) {
              $scope.currentUserReview = {
                review: review.review,
                review_title: review.review_title,
                rating: review.rating,
                id: review.id
              };
              $scope.haveReviewed = true;
              $scope.eventReview = {};
              return;
            }

            $scope.showError = true;
            $scope.errorMessage = review.error;
            return;
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

        $scope.enableReviewEdit = function(reviewObject) {
          $scope.haveReviewed = false;
          $scope.editing = true;
          $scope.eventReview = {
            review: reviewObject.review,
            review_title: reviewObject.review_title,
            rating: reviewObject.rating,
            id: reviewObject.id
          };
        };

        $scope.updateEvent = function(eventData) {
          Reviews.update(eventData, function(review) {
            if (!review.error) {
              $scope.haveReviewed = true;
              $scope.currentUserReview = eventData;
              $scope.eventReview = {};
              return;
            }
            $scope.showError = true;
            $scope.errorMessage = review.error;
            return;
          });
        };

        $scope.cancelEventUpdate = function() {
          $scope.haveReviewed = true;
        };

        $scope.removeEventReview = function(reviewId) {
          Reviews.delete({ id: reviewId }, function(result) {
            if (result.message) {
              $scope.editing = false;
              $scope.haveReviewed = false;
              $scope.eventReview = {};
            }
          });
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
        };

        $scope.init();
      }
    ]);
})();

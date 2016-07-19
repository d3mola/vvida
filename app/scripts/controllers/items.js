(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemCtrl', ['$rootScope', '$scope', '$state', '$stateParams',
      '$mdSidenav', 'Categories', 'FileUploader', 'Utils', 'Items', 'Reviews',
      'Images',
      function($rootScope, $scope, $state, $stateParams, $mdSidenav,
        Categories, FileUploader, Utils, Items, Reviews, Images) {
        // Close Left Side Nav bar
        $scope.close = function() {
          $mdSidenav('catNav').close();
        };

        $scope.toggleSidenav = function() {
          $mdSidenav('catNav').toggle();
        };

        $scope.range = function(n) {
          return new Array(n); 
        };

        $scope.rate = function(n) {
          $scope.itemReview.rating = n;
        };

        $scope.maxReview = function(itemReviews) {
          return window._.max(itemReviews, function(review) {
            return review.rating;
          });
        };

        $scope.reviewNum = function(review) {
          return review.length > 1 ? 'reviews' : 'review';
        };

        $scope.pluralizeReview = function(review) {
          return review > 1 ? 'reviews' : 'review';
        };

        $scope.averageReview = function(itemReviews) {
          if (itemReviews) {
            var sum = 0;
            var count = 0;
            itemReviews.forEach(function(review) {
              sum += review.rating;
              count += 1;
            });
            return Math.round(sum / count) || 0;
          }
        };

        $scope.getCategory = function() {
          // load the categoryItems
          $scope.categoryItems = Categories.get({
            id: $scope.categoryId,
            model: 'Items'
          });
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
        };

        $scope.addItemReview = function() {
          $scope.itemReview.itemId = $stateParams.id;
          Reviews.save($scope.itemReview, function(review) {
            if (review) {
              $scope.currentUserReview = {
                review: review.review,
                review_title: review.review_title,
                rating: review.rating,
                id: review.id
              };
              $scope.haveReviewed = true;
              $scope.itemReview = {};
            }
          });
        };

        $scope.updateItemReview = function(itemData) {
          Reviews.update(itemData, function(review) {
            if (!review.error) {
              $scope.haveReviewed = true;
              $scope.currentUserReview = itemData;
              $scope.itemReview = {};
              return;
            }
            $scope.errorMessage = review.error;
            return;
          });
        };

        $scope.removeEventReview = function(reviewId) {
          Reviews.delete({ id: reviewId }, function(result) {
            if (result.message) {
              $scope.editing = false;
              $scope.haveReviewed = false;
              $scope.itemReview = {};
            }
          });
        };

        $scope.cancelEventUpdate = function() {
          $scope.haveReviewed = true;
        };

        $scope.enableReviewEdit = function(reviewObject) {
          $scope.haveReviewed = false;
          $scope.editing = true;
          $scope.itemReview = {
            review: reviewObject.review,
            review_title: reviewObject.review_title,
            rating: reviewObject.rating,
            id: reviewObject.id
          };
        };

        $scope.init = function() {
          // get all categories
          $scope.categories = Categories.query({
            type: 'Item'
          });
          $scope.userId = $rootScope.currentUser.id;
          // Hides the error message container
          $scope.haveReviewed = false;
          // Decides which button to display during edit
          $scope.editing = false;
          $scope.currentUserReview = {};
          $scope.itemReview = {};
          $scope.recentItems = Items.query();
          // get selected category id
          $scope.categoryId = $stateParams.catId;

          // get Pouplar Items
          Items.popularProducts(function(err, res) {
            if (err) {
              $scope.errMessage = 'Error Ecountered';
              return;
            }

            $scope.popularItems = res;
          });

          // Watches the popularProducts state and set showPopularOnly true
          $scope.$watch(function() {
              return $state.current.name;
            },
            function(name) {
              if (name === 'popularProducts') {
                $scope.showPopularOnly = true;
                return;
              }

              $scope.showPopularOnly = false;
            });

          // initialize scope.item for model
          $scope.getItem = function() {
            $scope.itemId = $stateParams.id;
            Items.get({
              id: $stateParams.id
            }, function(item) {
              $scope.item = item;
              for (var i = 0; i < item.Reviews.length; i++) {
                if (item.Reviews[i].user_id === $scope.userId) {
                  $scope.currentUserReview = item.Reviews[i];
                  $scope.haveReviewed = true;
                  $scope.item.Reviews.splice(i, 1);
                  break;
                }
              }
            });
          };
          //initialize current tab
          $scope.tabIndex = $stateParams.tabIndex;
        };

        $scope.deleteImage = function(id) {
          Images.delete(id, function() {
            $state.go($state.current, {
              id: $scope.itemId,
              tabIndex: 2
            }, {
              reload: true
            });
          });
        };

        $scope.init();
      }
    ]);
})();

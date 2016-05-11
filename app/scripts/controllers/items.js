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
              $scope.item.Reviews.push(review);
              $scope.itemReview = {};
            }
          });
        };

        $scope.init = function() {
          // get all categories
          $scope.categories = Categories.query({
            type: 'Item'
          });
          // get Recent Items
          $scope.recentItems = Items.query();
          // get selected category id
          $scope.categoryId = $stateParams.catId;
          // initialize scope.item for model
          $scope.item = {};
          $scope.getItem = function() {
            $scope.itemId = $stateParams.id;
            Items.get({
              id: $stateParams.id
            }, function(item) {
              $scope.item = item;
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

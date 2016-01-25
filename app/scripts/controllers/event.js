(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams', '$filter',
      '$mdSidenav', 'FileUploader', 'Utils', 'Events',
      function($scope, $state, $stateParams, $filter, $mdSidenav,
        FileUploader, Utils, Events) {
        // create event
        $scope.addEvent = function() {
          Events.save($scope.event, function(event) {
            if (event) {
              $state.go('editEvent', {
                id: event.id
              });
            } else {
              Utils.toast('Event not created');
            }
          });
        };

        // Sidebar Navigation control
        $scope.close = function() {
          $mdSidenav('eventNav').close();
        };

        $scope.toggleSidenav = function() {
          $mdSidenav('eventNav').toggle();
        };

        // Set filter for event list
        // event model to be updated for list filter
        $scope.setCat = function(listName) {
          $scope.eventCat = listName;
          $scope.close();
        };

        //Get the eventId
        $scope.init = function() {
          $scope.event = {
            eventId: $stateParams.id
          };

          $scope.eventCat = 'Popular Events';

          $scope.loadEvents = Events.query();

          // Data for event type lists
          $scope.lists = [{
            name: 'Popular Events'
          }, {
            name: 'Concerts'
          }, {
            name: 'Exhibitions and Showcases'
          }, {
            name: 'Business and Economics'
          }];
        };

        // format date data
        $scope.parseTime = function(eventTime) {
          return {
            day: $filter('date')(eventTime, 'EEEE dd MMM yyyy'),
            time: $filter('date')(eventTime, 'hh:mm a')
          };
        };

        $scope.getEvent = function() {
          $scope.eventId = $stateParams.id;

          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [$scope.event],
          });

          //load the item
          Events.get({
            id: $stateParams.id
          }, function(event) {
            $scope.event = event;
            $scope.event.time = null;
          });
        };

        $scope.updateEvent = function() {
          Events.update($scope.event, function(event) {
            Utils.toast(event.message);
          });
        };

        $scope.showToast = function() {
          Utils.toast('Upload complete');
        };

        $scope.upload = function() {
          $scope.uploader.uploadAll();
        };

        $scope.init();
      }
    ]);
})();

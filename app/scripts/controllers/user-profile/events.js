angular.module('vvida.controllers')
  .controller('UserEventsCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'Users',
    'Utils',
    'Events',
    'FileUploader',
    'Categories',
    '$mdDialog',
    function($scope, $rootScope, $state, $stateParams,
      Users, Utils, Events, FileUploader, Categories, $mdDialog) {

      $scope.init = function() {

        Users.events($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.message = 'Your events goes here.';
          } else {
            $scope.events = res;
            if (res.Events.length === 0) {
              $scope.message = 'Your events goes here.';
            }
          }
        });

        // get all categories
        $scope.categories = Categories.query({
          type: 'Event'
        });

      };

      // create event
      $scope.addEvent = function() {
        Events.save($scope.event, function(event) {
          if (event) {
            $mdDialog.cancel();
            $state.go('userProfile.editEvent', {
              id: event.id
            });
          } else {
            Utils.toast('Event not created');
          }
        });
      };

      // get selected event id
      $scope.getEvent = function() {
        $scope.eventId = $stateParams.id;
        $scope.uploader = new FileUploader({
          url: '/api/image/',
          alias: 'photos',
          formData: [{
            eventId: $scope.eventId,
            userId: $rootScope.currentUser.id
          }],
          onCompleteItem: function() {
            Events.update($scope.event, function() {
              $state.go($state.current, {
                id: $scope.eventId,
                userId: $rootScope.currentUser.id,
                tabIndex: 1
              }, {
                reload: true
              });
            });
          }
        });

        Events.get({
          id: $stateParams.id
        }, function(event) {
          $scope.event = event;
          $scope.event.start_time = new Date(event.start_time);
          $scope.event.end_time = new Date(event.end_time);
        });

        $scope.categories = Categories.query({
          type: 'Event'
        });
      };

      $scope.updateEvent = function() {
        Events.update($scope.event, function(event) {
          Utils.toast(event.message);
          $state.go('userProfile.events');
        });
      };

      $scope.deleteEvent = function(id) {
        Events.delete({
          id: id
        }, function(msg) {
          Utils.toast(msg.message);
          $state.go('userProfile.events', {}, { reload: true });
        });
      };

      $scope.showToast = function() {
        Utils.toast('Upload complete');
      };

      $scope.upload = function() {
        $scope.uploader.uploadAll();
      };

      $scope.parseDate = function(date) {
        return Utils.parseTime(date);
      };

      $scope.addEventModal = function(ev) {
        Utils.modal(ev, 'event', 'Create an Event');
      };
    }
  ]);

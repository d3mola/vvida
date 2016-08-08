angular.module('vvida.controllers')
  .controller('WelcomeCtrl', ['$scope', '$rootScope', 'Events',
    function($scope, $rootScope, Events) {
      $scope.init = function() {
        $scope.todos = [];
        $scope.events = Events.query();
        for (var i = 0; i < 3; i++) {
          $scope.todos.push({
            face: 'http://lorempixel.com/100/100/people?' + i,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            notes: 'I\'ll be in your neighborhood doing errands.'
          });
        }
      };
      $scope.init();
    }
  ]);

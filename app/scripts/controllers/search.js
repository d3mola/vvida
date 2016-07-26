angular.module('vvida.controllers')
  .controller('SearchCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'Events',
    'Categories',
    'Utils',
    function(
      $rootScope,
      $scope,
      $state,
      $stateParams,
      Events,
      Categories,
      Utils) {
      $scope.init = function() {
        // get all categories
        $scope.categories = Categories.query({
          type: 'Event'
        });

        $scope.searchTerm = $stateParams.query;

        Events.search($stateParams.query, function(err, data) {
          data.forEach(function(event) {
            $scope.searchResults.push(event);
          });
        });
      };

      // format date data
      $scope.getTime = function(eventTime) {
        return Utils.parseTime(eventTime);
      };

      $scope.searchResults = [];

      $scope.init();
    }
  ]);

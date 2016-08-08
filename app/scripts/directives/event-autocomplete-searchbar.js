angular.module('vvida.directives')
.directive('eventAutocompleteSearchbar', function($state, $q, Events){
    return {
      restrict: 'EA',
      template: 
      '<md-autocomplete class=\'search-autocomplete md-block\' ' +
      ' md-selected-item=\'selectedItem\' md-search-text=\'searchText\' ' +
      ' md-items=\'item in getMatches(searchText)\' ' +
      ' md-item-text=\'item.name\' ' + 
      ' md-menu-class=\'vvida-autocomplete\' md-min-length=\'2\' ' +
      ' md-delay=\'1000\' placeholder=\'Search\' ' +
      ' ng-keyup=\'searchBoxKeyPress($event, searchText)\' md-no-float> ' +

      '  <md-item-template> ' +
      '    <div class=\'item-container\'  ' +
      '     ui-sref=\'viewEvent({id: item.id})\'> ' +

      '     <div class=\'item-img\' back-img=\'{{item.Images[0].img_url}}\'> ' +
      '     </div> ' +
      '     <div class=\'item-text\'> ' +
      '       <span> {{item.name}} </span> ' +
      '     </div> ' +

      '   </div> ' +
      ' </md-item-template> ' +

      ' <md-not-found> Nothing found </md-not-found> ' +

      '</md-autocomplete>',
      link: function($scope, elem, attr) {
        setTimeout(function() {
          var input = elem[0].querySelector('input');

          input.placeholder = attr.placeholder || 'Search';

          input.addEventListener('focus', function() {
            input.placeholder = '';
          });

          input.addEventListener('blur', function() {
            input.placeholder = attr.placeholder;
          });
        }, 0);
        
        $scope.getMatches = function(query) {
          var deferred = $q.defer();
          Events.search(query, function(err, data) {
            deferred.resolve(data);
          });
          return deferred.promise;
        };

        $scope.goToSearchPage = function(search) {
          if (search.trim().length) {
            $state.go('search', {query: search});
          }
        };

        $scope.searchBoxKeyPress = function(event, searchText) {
          if (event.keyCode === 13) {
            event.preventDefault();
            $scope.goToSearchPage(searchText);
          }
        };
      }
    };
});
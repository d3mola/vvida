var shown = false;
angular.module('vvida.directives')
 .directive('vvidaPreloader', ['$http' ,function ($http)
 {
    return {
         restrict: 'A',
         link: function (scope, element)
         {
            function showElements(preloader) {
                togglePreloader(preloader, 'hide');
                shown = true;
            }

            function hideElements(preloader) {
                togglePreloader(preloader);
            }

            function togglePreloader (preloader, hide) {
                (hide) ? preloader.style.display = 'none' :
                    preloader.style.display = 'block';
            }

            scope.isLoading = function () {
                return $http.pendingRequests.length;
            };

            scope.$watch(scope.isLoading, function (res) {
                if(!shown) {
                    (res === 0) ? showElements(element[0]):
                        hideElements(element[0]);
                }
            });
         }
     };

 }]);

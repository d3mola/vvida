angular.module('vvida.controllers')
  .controller('FooterCtrl', ['$scope', function($scope) {

    $scope.business = [{
      name: 'Claim your Business Page',
      state: 'home'
    }, {
      name: 'Advertise on Vvida',
      state: 'home'
    }, {
      name: 'Business Success Stories',
      state: 'home'
    }];

    $scope.about = [{
      name: 'About Vvida',
      state: 'home'
    }, {
      name: 'Content Guidelines',
      state: 'home'
    }, {
      name: 'Terms of Service',
      state: 'home'
    }];
  }]);

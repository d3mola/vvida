angular.module('vvida.controllers')
  .controller('FooterCtrl', ['$scope', function($scope) {

    $scope.discover = [{
      name: 'The Weekly Vvida',
      state: 'home'
    }, {
      name: 'Vvida Blog',
      state: 'home'
    }, {
      name: 'Support',
      state: 'home'
    }, {
      name: 'Vvida Mobile',
      state: 'home'
    }, {
      name: 'Developers',
      state: 'home'
    }, {
      name: 'RSS Feed',
      state: 'home'
    }];

    $scope.business = [{
      name: 'Claim your Business Page',
      state: 'home'
    }, {
      name: 'Advertise on Vvida',
      state: 'home'
    }, {
      name: 'Support',
      state: 'home'
    }, {
      name: 'Business Success Stories',
      state: 'home'
    }, {
      name: 'Business Support',
      state: 'home'
    }, {
      name: 'Vvida Blog for Business Owners',
      state: 'home'
    }];

    $scope.about = [{
      name: 'About Vvida',
      state: 'home'
    }, {
      name: 'Press',
      state: 'home'
    }, {
      name: 'Content Guidelines',
      state: 'home'
    }, {
      name: 'Terms of Service',
      state: 'home'
    }, {
      name: 'Private Policy',
      state: 'home'
    }, {
      name: 'Ad Choices',
      state: 'home'
    }];
  }]);

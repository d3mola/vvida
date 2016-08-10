(function() {
  'use strict';
  angular.module('vvida.filters', []);
  angular.module('vvida.services', []);
  angular.module('vvida.directives', []);
  angular.module('vvida.controllers', []);

  //Require Services
  require('./services/utils');
  require('./services/users');
  require('./services/categories');
  require('./services/countries');
  require('./services/images');
  require('./services/events');
  require('./services/reviews');
  require('./services/token');
  require('./services/auth');
  require('./services/token-injector');
  require('./services/reservations');
  require('./services/notifications');
  require('./services/promotions');
  require('./services/messages');

  // Require Controllers
  require('./controllers/footer');
  require('./controllers/home');
  require('./controllers/profile');
  require('./controllers/about');
  require('./controllers/login');
  require('./controllers/welcome');
  require('./controllers/header');
  require('./controllers/user-profile/index');
  require('./controllers/user-profile/events');
  require('./controllers/user-profile/pictures');
  require('./controllers/user-profile/reviews');
  require('./controllers/search');
  require('./controllers/event-view');
  require('./controllers/event');

  // Require Directives
  require('./directives/ng-thumb');
  require('./directives/back-img');
  require('./directives/event-autocomplete-searchbar');
  require('./directives/vvida-card');
  require('./directives/vvida-preloader');


  // Requier Filters
  require('./filters/clip-text');

  window.app = angular.module('vvida', [
    'vvida.controllers',
    'vvida.services',
    'vvida.filters',
    'vvida.directives',
    'ngRoute',
    'ui.router',
    'ngResource',
    'ngMaterial',
    'angularFileUpload'
  ]);

  window.app.run(['$rootScope', '$location', '$state', '$mdSidenav', 'Users',
    function($rootScope, $location, $state, $mdSidenav, Users) {
      $rootScope.$on('$stateChangeSuccess', fireAuth);

      function fireAuth(ev, toState) {
        ev.preventDefault();
        if (toState.authenticate && $rootScope.currentUser) {
          $state.go(toState);
        } else if (!toState.authenticate) {
          $state.go(toState);
        } else {
          $state.go('login');
        }
      }

      // Check if the user's session is still being persisted in the servers
      Users.session(function(err, res) {
        if (!err && res) {
          $rootScope.currentUser = res;
        }
      });

      $rootScope.login = function() {
        $state.go('login');
      };

      $rootScope.menu = [{
        name: 'Home',
        state: 'home'
      }, {
        name: 'About',
        state: 'about'
      }, {
        name: 'Events',
        state: 'events'
      }];

      $rootScope.activeClass = 'Home';

      $rootScope.focusSection = function (menuName) {
        $rootScope.activeClass = menuName;
      };

      $rootScope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $rootScope.closeLeftMenu = function() {
        $mdSidenav('left').close();
      };
    }
  ]);
  window.app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider',
    '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider,
      $locationProvider, $mdThemingProvider) {

      // For injecting tokens into request headers
      $httpProvider.interceptors.push('TokenInjector');

      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');


      // Set up theme the entire application
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('pink');

      // Set up states
      $stateProvider
        .state('home', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'views/home.html'
        })
        .state('about', {
          url: '/about',
          controller: 'AboutCtrl',
          templateUrl: 'views/about.html'
        })
        .state('events', {
          url: '/events',
          controller: 'EventCtrl',
          templateUrl: 'views/events.html'
        })
        .state('events.all', {
          url: '/{view}/?{page}',
          views: {
            'inner@events': {
              controller: 'EventViewsCtrl',
              templateUrl: 'views/all-events.html',
            }
          }
        })
        .state('events.categoryEvents', {
          url: '/categories/{catId}',
          views: {
            'inner@events': {
              controller: 'EventViewsCtrl',
              templateUrl: 'views/all-events.html'
            }
          }
        })
        .state('authSuccess', {
          url: '/auth/success/{token}/{id}',
          controller: ['$stateParams', 'Auth', '$state',
            function($stateParams, Auth, $state) {
              Auth.setToken($stateParams.token);
              var loc = $state.href('userProfile',
                { id: $stateParams.id }, { absolute: true });
              window.location.href = loc;
            }
          ]
        })
        .state('viewEvent', {
          url: '/events/{id}',
          controller: 'EventCtrl',
          templateUrl: 'views/view-event.html'
        })
        .state('search', {
          url: '/search?query',
          controller: 'SearchCtrl',
          templateUrl: 'views/search.html'
        })
        .state('userProfile', {
          url: '/user/{id}/profile',
          controller: 'UserProfileCtrl',
          templateUrl: 'views/user-profile.html'
        })
        .state('userProfile.edit', {
          url: '/edit',
          views: {
            'inner-view@userProfile': {
              controller: 'ProfileCtrl',
              templateUrl: 'views/edit-profile.html'
            },
          }
        })
        .state('userProfile.products', {
          url: '/products',
          views: {
            'inner-view@userProfile': {
              controller: 'UserProductsCtrl',
              templateUrl: 'views/user-products.html'
            }
          }
        })
        .state('userProfile.events', {
          url: '/events',
          views: {
            'inner-view@userProfile': {
              controller: 'UserEventsCtrl',
              templateUrl: 'views/user-events.html'
            }
          }
        })
        .state('userProfile.editEvent', {
          url: '/events/{id}/edit',
          params: {
            tabIndex: 0
          },
          views: {
            'inner-view@userProfile': {
              controller: 'UserEventsCtrl',
              templateUrl: 'views/edit-event.html'
            }
          }
        })
        .state('popularEvents', {
          url: '/event/categories/popular',
          controller: 'EventCtrl',
          templateUrl: 'views/events.html'
        })
        .state('categoryEvents', {
          url: '/event/categories/{catId}',
          controller: 'EventCtrl',
          templateUrl: 'views/events.html'
        })
        .state('login', {
          url: '/users/login',
          controller: 'LoginCtrl',
          templateUrl: 'views/login.html'
        })
        .state('welcome', {
          url: '/welcome',
          controller: 'WelcomeCtrl',
          templateUrl: 'views/welcome.html'
        })
        .state('upload', {
          url: '/upload',
          controller: 'AboutCtrl',
          templateUrl: 'views/upload.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);
})();
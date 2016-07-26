describe('EventCtrl tests', function() {
  'use strict';
  var scope,
    controller,
    Utils,
    Events = {
      save: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      update: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      popularEvents: function(cb) {
        cb(null, {
          message: 'Sample Event Message'
        });
      },
      get: function(id, cb) {
        cb({
          message: 'Sample Event Message',
          Reviews: ['me', 'you', 'i']
        });
      },
      query: function(id, params) {
        if (!params && !id) {
          return [1, 2, 3, 4, 5, 6];
        } else {
          if (typeof params === 'function') {
            params([1, 2, 3, 4, 5, 6]);
          } else {
            var page = params.page || 0,
              limit = params.limit || 3,
              start = limit * page,
              end = start + limit;
            return [1, 2, 3, 4, 5, 6].slice(start, end);
          }
        }
      }
    },

    rootScope = {
      currentUser: {
        id: 1
      }
    },

    Categories = {
      save: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      update: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      get: function(query, cb) {
        if (query.model) {
          cb({
            message: 'Sample Category Message',
            'Events': [1, 2, 3, 4]
          });
        } else {
          cb({
            message: 'Sample Category Message',
          });
        }
      },
      query: function(query) {
        if (query.type === 'Event') {
          return [1, 2, 3, 4, 5, 6];
        } else if (query.type === 'Item') {
          return [7, 8, 9, 10];
        }
      }
    },

    Reviews = {
      save: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      update: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      get: function(id, cb) {
        cb({
          message: 'Sample Category Message'
        });
      },
      query: function() {
        return [1, 2, 3, 4, 5, 6];
      }
    },


    state, stateParams;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('EventCtrl', {
      $rootScope: rootScope,
      $scope: scope,
      Events: Events,
      Categories: Categories,
      Reviews: Reviews
    });
    state = $injector.get('$state');
    stateParams = $injector.get('$stateParams');
    Utils = $injector.get('Utils');
  }));

  // initialize state
  it('should load events and categories on init', function() {
    spyOn(Categories, 'query').and.callThrough();
    spyOn(Events, 'query').and.callThrough();
    spyOn(Events, 'popularEvents').and.callThrough();
    scope.init();
    expect(scope.eventReview).toBeDefined();
    expect(scope.categories).toBeDefined();
    expect(Events.query).toHaveBeenCalled();
    expect(Events.popularEvents).toHaveBeenCalled();
    expect(scope.recentEvents).toBeDefined();
    expect(scope.popularEvents).toBeDefined();
  });

  it('should get an event', function() {
    stateParams.id = 1;
    spyOn(Events, 'get').and.callThrough();
    scope.getEvent();
    expect(scope.eventId).toBe(1);
    expect(scope.event.message).toBe('Sample Event Message');
  });

  it('should return date and time', function() {
    spyOn(Utils, 'parseTime').and.callThrough();
    var testDate = new Date(),
      eventTime = scope.getTime(testDate);
    expect(Utils.parseTime).toHaveBeenCalledWith(testDate);
    expect(eventTime.day).toBeDefined();
    expect(eventTime.time).toBeDefined();
  });

  it('should return an array of n elements', function() {
    spyOn(scope, 'range').and.callThrough();
    var arr = scope.range(5);
    expect(arr).toBeDefined();
    expect(arr.length).toBe(5);
  });

  it('should set the rating of an event', function() {
    spyOn(scope, 'rate').and.callThrough();
    scope.rate(5);
    expect(scope.eventReview.rating).toBe(5);
  });

  it('should save an event review', function() {
    spyOn(Reviews, 'save').and.callThrough();
    scope.event = {};
    scope.event.Reviews = [];
    stateParams.id = 1;
    scope.addEventReview();
    expect(Reviews.save).toHaveBeenCalled();
    expect(scope.event.Reviews).toBeDefined();
    expect(scope.eventReview).toBeDefined();
  });

  it('should return average rating for an event', function() {
    var eventReview = [{
      title: 'Test Review 1',
      rating: 5
    }, {
      title: 'Test Review 2',
      rating: 6
    }, {
      title: 'Test Review 3',
      rating: 5
    }];
    var avgRating = scope.averageReview(eventReview);
    expect(avgRating).toBe(5);
  });

  it('should set Selected Image', function() {
    var img_url = './images/test.png';
    scope.setImage(img_url);
    expect(scope.selectedImage).toBe('./images/test.png');
  });

});

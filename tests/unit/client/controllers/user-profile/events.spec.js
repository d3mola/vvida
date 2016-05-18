describe('UserEventsCtrl tests', function() {
  'use strict';
  var scope,
    controller,
    Utils,
    Users = {
      events: function(currentUser, cb) {
        var res;
        if (currentUser) {
          res = {
            Events: [1, 2, 3]
          };
        }
        cb(!currentUser, res);
      }
    },

    currentUser = {
      city: 'Nairobi',
      country: 'Kenya',
      created_at: '2015-11-30T08:27:51.129Z',
      dob: '1941-09-29T21:00:00.000Z',
      email: 'koske.hannah@gmail.com',
      enabled: 'yes',
      facebook_auth_id: null,
      facebook_auth_token: null,
      firstname: 'Hannah',
      gender: 'female',
      google_auth_id: null,
      google_auth_token: null,
      id: 1,
      img_public_id: 'mpoibjealpmx2pmgc33a',
      img_url: 'http://res.cloudinary.com/vvida/image/upload/v1448872085/' +
        'mpoibjealpmx2pmgc33a.png',
      lastname: 'Koske',
      password: '$2a$10$mzOv0oTX/pNtl1f5HxTZZ.' +
        'LgHMBA2UHPYygq8AtdXeFpfoSGiw32u',
      role: 'user',
      status: 'active',
      token: null,
      updated_at: '2015-12-01T09:29:08.522Z',
      username: 'HannahCK',
    },

    Events = {
      save: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      update: function(evt, cb) {
        evt ? cb(evt) : cb(false);
      },
      get: function(id, cb) {
        cb({
          message: 'Sample Event Message',
          start_time: new Date(),
          end_time: new Date()
        });
      },
      query: function() {
        return [1, 2, 3];
      }
    };

  beforeEach(function() {
    module('vvida');
  });

  beforeEach(function() {
    inject(function($injector) {
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      Utils = $injector.get('Utils');
      controller = $controller('UserEventsCtrl', {
        $scope: scope,
        Users: Users,
        Events: Events
      });
    });

  });

  it('should call get Users events and set message', function() {
    scope.currentUser = false;
    spyOn(Users, 'events').and.callThrough();
    scope.init();
    expect(Users.events).toHaveBeenCalled();
    expect(scope.message).toBe('Your events goes here.');
  });

  it('should call get Users events and set events', function() {
    scope.currentUser = currentUser;
    spyOn(Users, 'events').and.callThrough();
    scope.init();
    expect(Users.events).toHaveBeenCalled();
    expect(scope.message).not.toBeTruthy();
  });

  it('should define a false event and fail', function() {
    scope.event = false;
    spyOn(Events, 'save').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.addEvent();
    expect(Events.save).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('Event not created');
  });

  it('should define and add an event', function() {
    scope.event = {
      user_id: 1,
      name: 'Sample Event',
      description: 'Sample Event Description',
      location: 'Sample Event Location',
      venue: 'Sample Event Venue',
      start_time: new Date(),
      end_time: new Date(),
      sponsor: 'Sample Event Sponsor',
      message: 'Sample Event Message'
    };
    spyOn(Events, 'save').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.addEvent();
    expect(Events.save).toHaveBeenCalled();
    expect(Utils.toast).not.toHaveBeenCalled();
  });


  it('should define and update an event', function() {
    scope.event = {
      message: 'Sample Event Message'
    };
    spyOn(Events, 'update').and.callThrough();
    spyOn(Utils, 'toast').and.callThrough();
    scope.updateEvent();
    expect(Events.update).toHaveBeenCalled();
    expect(Utils.toast).toHaveBeenCalledWith('Sample Event Message');
  });

  it('should get an event', function() {
    scope.currentUser = currentUser;
    spyOn(Events, 'get').and.callThrough();
    scope.getEvent();
    expect(Events.get).toHaveBeenCalled();
    expect(scope.event).toEqual({
      message: 'Sample Event Message',
      start_time: new Date(),
      end_time: new Date()
    });
  });

  it('should call Utils.toast', function() {
    spyOn(Utils, 'toast');
    scope.showToast();
    expect(Utils.toast).toHaveBeenCalledWith('Upload complete');
  });

  it('should call uploader.uploadAll', function() {
    scope.currentUser = currentUser;
    scope.getEvent();
    spyOn(scope.uploader, 'uploadAll');
    scope.upload();
    expect(scope.uploader.uploadAll).toHaveBeenCalled();
  });

  it('should add a dialog view', function() {
    spyOn(Utils, 'modal').and.callThrough();
    scope.addEventModal('ev', 'event', 'Create an Event');
    expect(Utils.modal).toHaveBeenCalled();
  });

});

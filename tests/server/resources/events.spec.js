(function() {
  'use strict';

  var request = require('superagent'),
    faker = require('faker'),
    _expect = require('expect.js'),
    resourceApiURL = 'http://localhost:3000/api/events';

  describe('Events resource API tests', function() {

    var initialEventName = faker.commerce.productName(),
      generateFakeEvent = function() {
        return {
          // userId: faker.random.number(),
          name: initialEventName,
          description: faker.lorem.sentence(),
          location: faker.address.streetName(),
          venue: faker.address.streetAddress(),
          start_time: faker.date.recent(),
          end_time: faker.date.recent(),
          sponsor: faker.company.companyName(),
          category_id: faker.random.number(),
        };
      },
      generateFakeEventUpdates = function() {
        return {
          name: faker.commerce.productName(),
          location: faker.address.streetName(),
          description: faker.lorem.sentence(),
          venue: faker.address.streetAddress()
        };
      },
      authToken = null,
      // id to be a 'string'when a resource added
      // id to be defined when a resource added
      anEvent;

    /**
     * Display a listing of the resource.
     * GET /items
     *
     * @return Response
     */
    it('should return empty array if DB is empty', function(done) {
      request
        .get(resourceApiURL)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.body.length).to.equal(0);
          done();
        });
    });

    /**
     * Store a newly created resource in storage.
     * POST /items
     *
     * @return Response
     */
    it('Must create session to run actions on items', function(done) {
      // Must log in to retain a session
      request
        .post('http://localhost:3000/api/users/login')
        .send({
          email: 'vvidaapp@gmail.com',
          password: '3at1ngYums@wh1leD0ingTh3Whip.c0m'
        })
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.token).to.be.a('string');
          _expect(res.body.token.length).to.be.greaterThan(100);
          authToken = res.body.token;
          done();
        });
    });

    it('should not store created resource in storage.', function(done) {
      var fakeEvent = generateFakeEvent();
      request
        .post(resourceApiURL)
        .set('X-Access-Token', null)
        .send(fakeEvent)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(401);
          done();
        });
    });

    it('should store a newly created resource in storage.', function(done) {
      var fakeEvent = generateFakeEvent();
      request
        .post(resourceApiURL)
        .set('X-Access-Token', authToken)
        .send(fakeEvent)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          var newEventStored = res.body;
          _expect(newEventStored.name).to.be(fakeEvent.name);
          _expect(newEventStored.description).to.be(fakeEvent.description);
          _expect(newEventStored.id).to.be.a('number');
          anEvent = newEventStored;
          done();
        });
    });

    it('should return all events', function(done) {
      request
        .get(resourceApiURL)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.length).to.be.greaterThan(0);
          _expect(res.body[0].id).to.be.a('number');
          _expect(res.body[0].name).to.be.a('string');
          _expect(res.body[0].description).to.be.a('string');
          done();
        });
    });

    /**
     * Show the form for creating the specified resource.
     * GET /items/{id}/create
     *
     * @param  int  $id
     * @return Response
     */
    it('should show the form for creating a new resource', function() {
      // Not used in an angular application
      // since the angular application will route to the edit form
      // and display it
      _expect(true).to.be(true);
    });

    /**
     * Display the specified resource.
     * GET /items/{id}
     *
     * @param  int  $id
     * @return Response
     */
    it('should display the specified resource.', function(done) {
      request
        .get(resourceApiURL + '/' + anEvent.id)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.id).to.be(anEvent.id);
          done();
        });
    });

    /**
     * Show the form for editing the specified resource.
     * GET /items/{id}/edit
     *
     * @param  int  $id
     * @return Response
     */
    it('should show the form for editing the specified resource', function() {
      // Not used in an angular application
      // since the angular application will route to the edit form
      // and display it
      _expect(true).to.be(true);
    });

    /**
     * Search for events by their name property
     * GET /events?q={$searchTerm}
     *
     * @param  String  $searchTerm
     * @return Response
     */
    it('should search and return for events matched', function(done) {
      request
        .get(resourceApiURL + '/search?q=' + initialEventName)
        .set('X-Access-Token', authToken)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.length).to.be.above(0);
          res.body.forEach(function (event) {
            _expect(JSON.stringify(event))
              .to.match(new RegExp(initialEventName, 'i'));
          });
          done();
        });
    });

    /**
     * Update the specified resource in storage.
     * PUT /items/{id}
     *
     * @param  int  $id
     * @return Response
     */
    it('should update the specified resource in storage.', function(done) {
      request
        .put(resourceApiURL + '/' + anEvent.id)
        .set('X-Access-Token', authToken)
        .send(generateFakeEventUpdates())
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.message).to.match(/(successful)/);
          done();
        });
    });

    /**
     * Remove the specified resource from storage.
     * DELETE /items/{id}
     *
     * @param  int  $id
     * @return Response
     */
    it('should remove the specified resource from storage.', function(done) {
      request
        .del(resourceApiURL + '/' + anEvent.id)
        .set('X-Access-Token', authToken)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.message).to.match(/(successful)/);
          done();
        });
    });

    it('should assert the resource was deleted.', function(done) {
      request
        .get(resourceApiURL + '/' + anEvent.id)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(404);
          _expect(res.body.error).to.be('Event not found');
          done();
        });
    });
  });
})();

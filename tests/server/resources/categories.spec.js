(function() {
  'use strict';
  var request = require('superagent'),
    faker = require('faker'),
    _expect = require('expect.js'),
    resourceApiUrl = 'http://localhost:3000/api/categories';

  describe('Categories resource API tests', function() {

    var generateFakeCategory = function() {
        return {
          // catId: faker.random.number(),
          name: faker.commerce.department(),
          category: 'Event'
        };
      },
      authToken = null,
      // id to be a 'string'when a resource added
      id;

    /**
     * Store a newly created resource in storage.
     * POST /user/login
     *
     * @return Response
     */
    it('Must create session to be able to run actions on items',
        function(done) {
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

    /**
     * Display a listing of the resource.
     * GET /categories
     *
     * @return Response
     */

    it('should return empty array if DB is empty', function(done) {
      request
        .get(resourceApiUrl)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.body.length).to.equal(0);
          done();
        });
    });

    it('should not store a newly created resource in storage.', function(done) {
      var category = generateFakeCategory();
      request
        .post(resourceApiUrl)
        .set('X-Access-Token', null)
        .send(category)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(401);
          done();
        });
    });

    it('should store a newly created resource in storage.', function(done) {
      var category = generateFakeCategory();
      request
        .post(resourceApiUrl)
        .set('X-Access-Token', authToken)
        .send(category)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          var newCategory = res.body;
          _expect(newCategory.type).to.be(category.category);
          _expect(newCategory.id).to.be.a('number');
          id = newCategory.id;
          done();
        });
    });

    it('should return all categories', function(done) {
      request
        .get(resourceApiUrl)
        .query({
          'type': 'Event'
        })
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          var category = res.body;
          _expect(category.length).to.be.greaterThan(0);
          _expect(category[0].id).to.be.a('number');
          _expect(category[0].type).to.be.a('string');
          done();
        });
    });


    /**
     * Show the form for creating the specified resource.
     * GET /categories/:id
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
     * GET /categories/{id}
     *
     * @param  int  $id
     * @return Response
     */
    it('should display the specified resource.', function(done) {
      request
        .get(resourceApiUrl + '/' + id)
        .query({
          'model': 'Events'
        })
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.id).to.be(id);
          done();
        });
    });

    /**
     * Remove the specified resource from storage.
     * DELETE /categories/:id
     *
     * @param  int  $id
     * @return Response
     */
    it('should remove the specified resource from storage.', function(done) {
      request
        .del(resourceApiUrl + '/' + id)
        .set('X-Access-Token', authToken)
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(200);
          _expect(res.body.message).to.match(/(success)/);
          done();
        });
    });

    it('should assert the resource was deleted.', function(done) {
      request
        .get(resourceApiUrl + '/' + id)
        .query({
          'model': 'Events'
        })
        .accept('application/json')
        .end(function(err, res) {
          _expect(res.status).to.be(404);
          _expect(res.body.error).to.be('Category not found!');
          done();
        });
    });
  });
})();

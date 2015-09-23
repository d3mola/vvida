// events api
// this api will handle all the routes for events

var Events = require('../schemas/events');

module.exports = function(app) {

  app.route('/api/events')
    // create event route.
    .post(function(req, res) {
      Events.sync().then(function() {
        return Events.create({
          user_id: req.session.id,
          ev_name: req.body.eventName,
          description: req.body.description,
          location: req.body.location,
          venue: req.body.venue,
          time: req.body.time,
          sponsor: req.body.sponsor
        }).then(function(event) {
          if (!event) {
            res.status(500).send({
              error: 'Create event failed'
            });
          } else {
            res.json(event);
          }
        });
      });
    })

  .get(function(req, res) {
    Events.findAll().then(function(event) {
      res.json(event);
    });
  });

  app.route('/api/events/:id')
    // read events route
    .get(function(req, res) {
      return Events.find({
        where: {
          id: req.params.id
        }
      }).then(function(event) {
        if (!event) {
          res.status(404).send({
            message: 'Event not found'
          });
        } else {
          res.json(event);
        }
      });
    })

  // Update events route
  .put(function(req, res) {
    return Events.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(update) {
      if (!update) {
        res.status(500).send({
          error: 'Update failed'
        });
      } else {
        res.json({
          isUpdate: true,
          message: 'You have successfully Edited Your event'
        });
      }
    });
  })

  // Delete events route
  .delete(function(req, res) {
    return Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(ok) {
      if (!ok) {
        res.status(500).send({
          error: 'Delete failed'
        });
      } else {
        res.status(200).send({
          message: 'Delete successful'
        });
      }
    });
  });

};
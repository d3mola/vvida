(function() {
  'use strict';

  module.exports = function(app) {
    var Events = app.get('models').Events,
      Reviews = app.get('models').Reviews,
      Images = app.get('models').Images;

    // Create event middlware
    return {
      create: function(req, res) {
        return Events.create({
          user_id: req.decoded.id,
          name: req.body.name,
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
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get all the events
      all: function(req, res) {
        var limit = req.query.limit || 4;
        var offset = req.query.limit * req.query.page || 0;

        return Events.findAll({
          order: [
            ['id', 'DESC']
          ],
          offset: offset,
          limit: limit,
          include: [Images]
        }).then(function(event) {
          if (event) {
            res.json(event);
          }
        }).catch(function(err) {
          return res.status(500).send({
            message: 'Error retrieving event',
            error: err
          });
        });
      },

      // Middlware to get event by id
      find: function(req, res) {
        return Events.find({
          where: {
            id: req.params.id,
          },
          include: [Images, Reviews]
        }).then(function(event) {
          if (!event) {
            return res.status(404).send({
              message: 'Event not found'
            });
          } else {
            res.json(event);
          }
        }).catch(function(err) {
          return res.status(500).send({
            message: 'Error retrieving event',
            error: err
          });
        });
      },
      // Middlware to  update events
      update: function(req, res) {
        Events.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(ok, err) {
          if (err) {
            return res.status(500).send({
              error: 'Update failed'
            });
          }

          res.json({
            isUpdate: true,
            message: 'You have successfully Edited Your event'
          });
        });
      },

      // Middleware to delete an event
      delete: function(req, res) {
        Events.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(ok, err) {
          if (err) {
            return res.status(500).send({
              error: 'Delete failed'
            });
          }

          res.status(200).send({
            message: 'Delete successful'
          });
        });
      }
    };

  };

})();

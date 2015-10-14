var Events = require('../schemas/events'),
  eventService;

(function() {

  'use strict';

  eventService = {
    // Create event middlware
    createEvent: function(req, res) {
      Events.sync().then(function() {
        return Events.create({
          user_id: req.session.id,
          ev_name: req.body.eventName,
          description: req.body.description,
          location: req.body.location,
          venue: req.body.venue,
          time: req.body.time,
          sponsor: req.body.sponsor
        }).then(function(event, err) {
          console.log(err);
          if(err) {
            res.send(err);
          }
          if (!event) {
            res.status(500).send({
              error: 'Create event failed'
            });
          } else {
            res.json(event);
          }
        });
      }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
    },

    // Middleware to get all the events
    getAllEvents: function(req, res) {
      Events.findAll().then(function(event, err) {
        res.json(event);
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middlware to get event by id
    getEventById: function(req, res) {
      return Events.find({
        where: {
          id: req.params.id
        }
      }).then(function(event, err) {
        if (!event) {
          res.status(404).send({
            message: 'Event not found'
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
    // Middlware to  update events
    updateEvent: function(req, res) {
      return Events.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).send({
            error: 'Update failed'
          });
        } else {
          res.json({
            isUpdate: true,
            message: 'You have successfully Edited Your event'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    },

    // Middleware to delete an event
    deleteEvent: function(req, res) {
      return Events.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(ok, err) {
        if (err) {
          res.status(500).send({
            error: 'Delete failed'
          });
        } else {
          res.status(200).send({
            message: 'Delete successful'
          });
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    }
  };

})();

module.exports = eventService;

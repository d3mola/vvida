(function() {
  'use strict';
  
  module.exports = function(app) {
    var Events = app.get('models').Events,
      Images = app.get('models').Images,
      Categories = app.get('models').Categories,
      Users = app.get('models').Users,
      Reviews = app.get('models').Reviews,
      Sequelize = require('sequelize');

    // Create event middlware
    return {
      create: function(req, res) {
        Events.create({
          user_id: req.decoded.id,
          name: req.body.name,
          description: req.body.description,
          location: req.body.location,
          venue: req.body.venue,
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          sponsor: req.body.sponsor,
          category_id: req.body.category_id
        }).then(function(event) {
          res.json(event);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get all the events
      all: function(req, res) {
        var limit = req.query.limit || 4;
        var offset = req.query.limit * req.query.page || 0;
        var date = Date.now();
        var filter = (req.query.filter) ? {
          start_time: {
            $gt: date
          }
        } : {};

        Events.findAll({
          where: filter,
          order: [
            ['start_time', 'ASC']
          ],
          offset: offset,
          limit: limit,
          include: [Images, Reviews, Categories]
        }).then(function(event) {
          res.json(event);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get all the events
      popularEvents: function(req, res) {
        var limit = req.query.limit || 5;
        var offset = req.query.limit * req.query.page || 0;

        if (limit > 10) {
          limit = 5;
        }

        Reviews.findAll({
          attributes: [
            'event_id',
            [Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating']
          ],
          group: 'event_id',
          order: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'DESC']],
          limit: limit,
          offset: offset
        }).then(function(reviews) {
          var eventIDs = reviews.map(function(review) {
            return review.event_id;
          });

          Events.findAll({
            where: {
              id: {
                $in: eventIDs
              }
            },
            include: [Images, Reviews, Categories]
          }).then(function(events) {
            res.json(events);
          });
        }, function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      recentEvents: function(req, res) {
        var limit = req.query.limit || 5;

        if (limit > 10) {
          limit = 5;
        }

        Events.findAll({
          limit: limit,
          order: [['created_at', 'DESC']],
          include: [Images, Reviews, Categories]
        }).then(function(events) {
          res.json(events);
        });
      },

      // Middlware to get event by id
      find: function(req, res) {
        Events.find({
          where: {
            id: req.params.id,
          },
          include: [
            Images, {
            model: Reviews,
            include: [Users]
          }]
        }).then(function(event) {
          if (!event) {
            res.status(404).json({
              error: 'Event not found'
            });
          } else {
            res.json(event);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to search for events
      search: function(req, res) {
        Events.findAll({
          where: {
            $or: [{
              name: {
                $ilike: '%' + decodeURIComponent(req.query.q) + '%'
              }
            },{
              description: {
                $ilike: '%' + decodeURIComponent(req.query.q) + '%'
              }
            }, {
              location: {
                $ilike: '%' + decodeURIComponent(req.query.q) + '%'
              }
            }, {
              venue: {
                $ilike: '%' + decodeURIComponent(req.query.q) + '%'
              }
            }, {
              sponsor: {
                $ilike: '%' + decodeURIComponent(req.query.q) + '%'
              }
            }]
          },
          include: [Images, Reviews, Categories]
        }).then(function(events) {
          if (!events) {
            res.status(404).json({
              error: 'Event not found'
            });
          } else {
            res.json(events);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
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
            res.status(500).json({
              error: err.message || err.errors[0].message
            });
          } else {
            res.json({
              message: 'You have successfully Edited Your event'
            });
          }
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
            res.status(500).json({
              error: err.message || err.errors[0].message
            });
          } else {
            res.json({
              message: 'Delete successful'
            });
          }
        });
      }
    };
  };
})();

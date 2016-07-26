(function() {
  'use strict';
  var sequelize = require('./../config/db-connect');

  module.exports = function(app) {
    var Events = app.get('models').Events,
      Images = app.get('models').Images,
      Categories = app.get('models').Categories,
      Reviews = app.get('models').Reviews;

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
        var limit = req.query.limit || 4;
        var offset = req.query.limit * req.query.page || 0;

        var stmt =
          'SELECT Ev1.*, array_agg(Im1.img_url) AS Images, ' +
          'Cat1.name AS CatName, ' +
          'COUNT(Rv1.id) AS review_count, ROUND(AVG(Rv1.rating)) ' +
          'AS avg_rating FROM public."Events" AS Ev1 ' +
          'LEFT JOIN public."Categories" AS Cat1 ON Cat1.id=Ev1.category_id ' +
          'INNER JOIN public."Reviews" AS Rv1 ON Ev1.id=Rv1.event_id ' +
          'LEFT JOIN public."Images" AS Im1 ON Ev1.id=Im1.event_id ' +
          'GROUP BY Ev1.id, Ev1.name, Ev1.category_id, Ev1.description, ' +
          'Ev1.location, Ev1.venue, Ev1.start_time, Ev1.end_time, ' +
          'Ev1.sponsor, Ev1.created_at, Ev1.updated_at, Ev1.user_id, ' +
          'Cat1.id, Cat1.name ' +
          'ORDER BY review_count DESC ' +
          'LIMIT ' + limit + ' OFFSET ' + offset;

        sequelize.query(stmt, {
          type: sequelize.QueryTypes.SELECT
        }).then(function(events) {
           res.json(events);
        }, function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middlware to get event by id
      find: function(req, res) {
        Events.find({
          where: {
            id: req.params.id,
          },
          include: [Images, Reviews]
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

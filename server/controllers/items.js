(function() {
  'use strict';

  module.exports = function(app) {
    var Items = app.get('models').Items,
      Images = app.get('models').Images,
      Categories = app.get('models').Categories,
      Reviews = app.get('models').Reviews,
      Users = app.get('models').Users,
      sequelize = require('./../config/db-connect');

    return {
      create: function(req, res) {
        if (req.body.hasOwnProperty('name') &&
          req.body.hasOwnProperty('description')) {
          Items.create({
              user_id: req.decoded.id,
              category_id: req.body.category_id,
              name: req.body.name,
              city: req.body.city,
              description: req.body.description,
              street: req.body.street,
              phone: req.body.phone,
              email: req.body.email
            })
            .then(function(item) {
              res.json(item);
            })
            .catch(function(err) {
              res.status(500).json({
                error: err.message || err.errors[0].message
              });
            });
        } else {
          res.status(406).json({
            error: 'Not enough arguments/values to create item.'
          });
        }
      },

      all: function(req, res) {
        Items.findAll({
          order: [
            ['id', 'DESC']
          ],
          include: [{
            model: Images
          }, {
            model: Reviews,
            include: [Users]
          }, {
            model: Categories
          }]

        }).then(function(item) {
          res.json(item);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      find: function(req, res) {
        Items.find({
          where: {
            id: req.params.id
          },
          include: [
            Images,
            {
              model: Reviews,
              include: [Users]
            },
            Categories
          ]
        }).then(function(item) {
          if (!item) {
            res.status(404).json({
              error: 'Item not found'
            });
          } else {
            res.json(item);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      update: function(req, res) {
        Items.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'Item has been updated.'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get all the Items
      popularItems: function(req, res) {
        var limit = req.query.limit || 4;
        var offset = req.query.limit * req.query.page || 0;

        var stmt =
          'SELECT It1.*, array_agg(Im1.img_url) AS Images, ' +
          'Cat1.name AS CatName, ' +
          'COUNT(Rv1.id) AS review_count, ROUND(AVG(Rv1.rating)) ' +
          'AS avg_rating FROM public."Items" AS It1 ' +
          'LEFT JOIN public."Categories" AS Cat1 ON Cat1.id=It1.category_id ' +
          'INNER JOIN public."Reviews" AS Rv1 ON It1.id=Rv1.item_id ' +
          'LEFT JOIN public."Images" AS Im1 ON It1.id=Im1.item_id ' +
          'GROUP BY It1.id, It1.name, It1.category_id, It1.description, ' +
          'It1.phone, It1.city, It1.street, It1.email, It1.created_at, ' +
          'It1.updated_at, It1.user_id, Cat1.id, Cat1.name ' +
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
      delete: function(req, res) {
        Items.destroy({
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'Delete successful'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();

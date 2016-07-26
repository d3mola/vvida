(function() {
  'use strict';

  module.exports = function(app) {
    var Reviews = app.get('models').Reviews;

    var makeReviewQuery = function(userId, itemDataObj) {
      var queryObj = { where: { user_id: userId } };

      if (itemDataObj.eventId) {
        queryObj.where.event_id = itemDataObj.eventId;
      } else {
        queryObj.where.item_id = itemDataObj.itemId;
      }

      return queryObj;
    };

    var saveReview = function(res, userId, eventData) {
      Reviews.create({
        user_id: userId,
        item_id: eventData.itemId,
        event_id: eventData.eventId,
        review: eventData.review,
        review_title: eventData.review_title,
        rating: eventData.rating
      }).then(function(review) {
        res.json(review);
      }).catch(function(err) {
        res.status(500).json({
          error: err.message || err.errors[0].message
        });
      });
    };

    return {
      create: function(req, res) {
        var query = makeReviewQuery(req.decoded.id, req.body);
        Reviews.findOne(query).then(function(review) {
          if (!review) {
            saveReview(res, req.decoded.id, req.body);
          } else {
            var errorName = req.body.itemId ? 'a product' : 'an event';
            res.json({
              error: 'Oops!!! You can\'t review ' + errorName + ' twice'
            });
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      all: function(req, res) {
        Reviews.findAll({
          limit: 3,
          order: [
            ['id', 'DESC']
          ]
        }).then(function(review) {
          res.json(review);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      update: function(req, res) {
        Reviews.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'You have successfully updated your Review'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      delete: function(req, res) {
        Reviews.destroy({
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'Review deleted succesfully'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      find: function(req, res) {
        Reviews.find({
          where: {
            id: req.params.id
          }
        }).then(function(review) {
          if (!review) {
            res.status(404).json({
              error: 'Review not found'
            });
          } else {
            res.json(review);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();

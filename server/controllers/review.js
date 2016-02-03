(function() {
  'use strict';

  module.exports = function(app) {
    var Reviews = app.get('models').Reviews;

    return {
      create: function(req, res) {
        return Reviews.create({
          user_id: req.decoded.id,
          item_id: req.body.itemId,
          event_id: req.body.eventId,
          review: req.body.review,
          review_title: req.body.review_title,
          rating: req.body.rating
        }).then(function(review) {
          if (!review) {
            res.status(500).send({
              error: 'Create review failed'
            });
          } else {
            res.json(review);
          }
        }).catch(function(err) {
          res.status(500).send({
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
          res.status(500).send({
            error: err.message || err.error[0].message
          });
        });
      },

      update: function(req, res) {
        return Reviews.update(req.body, {
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
              message: 'You have successfully updated your Review'
            });
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      delete: function(req, res) {
        Reviews.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(ok, err) {
          if (err) {
            res.status(500).send({
              error: err.message || err.errors[0].message
            });
          } else {
            res.send({
              message: 'Review deleted succesfully'
            });
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      },

      find: function(req, res) {
        return Reviews.find({
          where: {
            id: req.params.id
          }
        }).then(function(review) {
          if (!review) {
            res.status(404).send({
              message: 'Review not found'
            });
          } else {
            res.json(review);
          }
        }).catch(function(err) {
          res.status(500).send({
            error: err.message || err.errors[0].message
          });
        });
      }
    };

  };

})();

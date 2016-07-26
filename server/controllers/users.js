(function() {
  'use strict';

  module.exports = function(app) {
    var passport = require('passport');

    var Users = app.get('models').Users,
      Items = app.get('models').Items,
      Categories = app.get('models').Categories,
      Events = app.get('models').Events,
      Reviews = app.get('models').Reviews,
      Images = app.get('models').Images,
      stripUser = function(user) {
        user.facebook_auth_id = null;
        user.facebook_auth_token = null;
        user.img_public_id = null;
        user.google_auth_id = null;
        user.google_auth_token = null;
        return user;
      };

    return {
      // login middleware
      login: function(req, res, next) {
        passport.authenticate('login', function(err, user) {
          if (user) {
            user.password = null;
            res.json(stripUser(user));
          } else {
            res.status(401).json({
              error: 'Authentication failed.'
            });
          }
        })(req, res, next);
      },

      signup: function(req, res, next) {
        passport.authenticate('signup', function(err, user) {
          // check for errors
          if (err) {
            res.status(500).json({
              error: err.message || err.errors[0].message
            });
          }
          // If passport doesn't return the user object,  signup failed
          else if (!user) {
            res.status(409).json({
              error: 'Signup failed. User already exists.'
            });
          } else {
            delete user.password;
            res.json(stripUser(user));
          }
          // else signup succesful
        })(req, res, next);
      },

      session: function(req, res) {
        Users.findById(req.decoded.id).then(function(user) {
          if (user && user.dataValues.token === req.token) {
            delete user.dataValues.password;
            res.json(stripUser(user.dataValues));
          } else {
            res.status(401).json({
              error: 'Invalid token.'
            });
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get all users
      all: function(req, res) {
        Users.findAll().then(function(users) {
          users.map(function(user) {
            user.password = null;
          });
          res.json(users);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middleware to get users by ID
      find: function(req, res) {
        Users.findById(req.params.id).then(function(user) {
          if (!user) {
            res.status(404).json({
              error: 'User not found'
            });
          } else {
            res.json(stripUser(user));
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      // Middileware to update user data
      update: function(req, res) {
        // edit user email
        Users.update(req.body, {
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
              message: 'Profile updated successfully.'
            });
          }
        });
      },

      delete: function(req, res) {
        Users.destroy({
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'User deleted successfully.'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      logout: function(req, res) {
        Users.update({
          token: null
        }, {
          where: {
            id: req.decoded.id
          }
        }).then(function() {
          res.json({
            message: 'Successfully logged out.'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      getItems: function(req, res) {
        Users.findOne({
          where: {
            id: req.params.id
          },
          include: [{
            model: Items,
            include: [Categories, Reviews, Images]
          }]
        }).then(function(user) {
          if (!user) {
            res.status(404).json({
              error: 'User not found'
            });
          } else {
            user.password = null;
            res.json(user);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      getEvents: function(req, res) {
        Users.findOne({
          where: {
            id: req.params.id
          },
          include: [{
          model: Events,
          include: [Categories, Reviews, Images]
        }]
        }).then(function(user) {
          if (!user) {
            res.status(404).json({
              error: 'User not found'
            });
          } else {
            user.password = null;
            res.json(user);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      getReviews: function(req, res) {
        Users.findOne({
          where: {
            id: req.params.id
          },
          include: [{
            model: Reviews,
            include: [{
              model: Items,
              include: [Categories, Images]
            }, {
              model: Events,
              include: [Categories, Images]
            }]
          }]
        }).then(function(user) {
          if (!user) {
            res.status(404).json({
              error: 'User not found'
            });
          } else {
            user.password = null;
            res.json(user);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      getReviewsCount: function(req, res) {
        Reviews.count({
          where: {
            user_id: req.params.id
          }
        }).then(function(count) {
          res.json(count);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      getEventsCount: function(req, res) {
        Events.count({
          where: {
            user_id: req.params.id
          }
        }).then(function(count) {
          res.json(count);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      getItemsCount: function(req, res) {
        Items.count({
          where: {
            user_id: req.params.id
          }
        }).then(function(count) {
          res.json(count);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();

(function() {
  'use strict';

  module.exports = function(app) {
    var Images = app.get('models').Images,
      Users = app.get('models').Users,
      cloudinary = require('cloudinary'),
      cloudinaryUpload = function(req, path, cb) {
        cloudinary.uploader.upload(path, function(result) {
          if (result && !result.error) {
            Images.create({
              item_id: req.body.itemId,
              event_id: req.body.eventId,
              user_id: req.body.userId,
              public_id: result.public_id,
              img_url: result.url.replace(/http:/gi, 'https:')
            }).then(function(image) {
              cb(null, image);
            }).catch(function(err) {
              cb(err, null);
            });
          } else {
            cb(result.error, null);
          }
        });
      };

    return {
      image: function(req, res) {
        if (req.files) {
          var path = req.files[0].path;
          cloudinaryUpload(req, path, function(err, image) {
            if (image) {
              res.json(image);
            } else {
              res.status(400).json({
                error: 'Upload'
              });
            }
          });
        }
      },

      userImgUpload: function(req, res) {
        if (req.files) {
          var path = req.files[0].path;
          var cb = function(err, image) {
            if (image) {
              res.json(image);
            } else {
              res.status(400).json({
                error: 'Upload failed'
              });
            }
          };

          cloudinary.uploader.upload(path, function(result) {
            if (result && !result.error) {
              return Users.update({
                img_public_id: result.public_id,
                img_url: result.url
              }, {
                where: {
                  id: req.body.id
                }
              }).then(function(image) {
                if (image) {
                  cb(null, result.url);
                }
              }).catch(function(err) {
                cb(err, null);
              });
            } else {
              cb(result.error, null);
            }
          });
        }
      },

      delete: function(req, res, next) {
        cloudinary.uploader.destroy(req.params.id, function(result) {
          if (result) {
            req.info = result;
            next();
          } else {
            res.status(400).json({
              error: 'Delete failed'
            });
          }
        });
      },

      deleteImage: function(req, res) {
        Images.destroy({
          where: {
            public_id: req.params.id
          }
        }).then(function() {
          req.info.db = {
            message: 'Delete succesful'
          };
          res.json(req.info);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();

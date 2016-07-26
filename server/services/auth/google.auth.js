// Use the GoogleStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Google
// profile), and invoke a callback with a user object.
module.exports = function(app, passport, config) {
  var GoogleStrategy = config.strategy.Google,
    jwt = require('jsonwebtoken'),
    ucfirst = require('../ucfirst'),
    Users = app.get('models').Users;
  passport.use(new GoogleStrategy(config.auth.GOOGLE,
    function(accessToken, refreshToken, profile, done) {
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {
        // check if the user exists in our database
        Users.findOne({
          where: {
            $or: [{
              google_auth_id: profile.id
            }, {
              email: profile.emails[0].value
            }]
          },

          attributes: ['id', 'name', 'img_url', 'gender', 'google_auth_id']
        }).then(function(user) {
          // If the user does not exist create one
          if (!user) {
            Users.build({
                email: profile.emails[0].value,
                role: 'user',
                username: profile.username,
                google_auth_id: profile.id,
                name: profile.displayName,
                google_auth_token: accessToken,
                img_url: profile.photos[0].value,
                gender: (profile.gender)? ucfirst(profile.gender) : 'Hidden'
              })
              // save the user instance build
              .save()
              .then(function(user) {
                user = user.dataValues;

                user.token = null;
                var token = jwt.sign({ id: user.id }, config.superSecret, {
                  expireIn: '8760h'
                });

                user.token = token;
                Users.update(user, {
                  where: {
                    id: user.id
                  }
                }).then(function(ok, err) {
                  if (err) {
                    return done(err, null);
                  }

                  user.password = undefined;
                  return done(null, user);
                });
              }).catch(function(err) {
                if (err) {
                  return done(err);
                }
              });
          }
          // If the user was found, then just do a redirect
          else {
            // or TODO maybe create cookies/sessions
            user.token = null;
            var token = jwt.sign({ id: user.id }, config.superSecret, {
              expiresIn: '8760h'
            });

            user.token = token;
            Users.update({ token: user.token }, {
              where: {
                id: user.id
              }
            }).then(function(ok, err) {
              if (err) {
                return done(err, null);
              }

              user.password = undefined;
              done(null, user);
            });
          }
        }).catch(function(err) {
          if (err) {
            return done(err);
          }
        });
      });
    }
  ));
};

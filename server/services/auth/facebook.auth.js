// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken,
// and Facebook profile), and invoke a callback with a user object
module.exports = function(app, passport, config) {
  var FacebookStrategy = config.strategy.Facebook,
    Users = app.get('models').Users;

  passport.use(new FacebookStrategy(config.auth.FACEBOOK,
    function(accessToken, refreshToken, profile, done) {
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Facebook
      process.nextTick(function() {
        // check if the user exists in out database
        Users.findOne({
          where: {
            $or: [{
              facebook_auth_id: profile.id,
            }, {
              email: profile.emails[0].value
            }]
          },
          attributes: ['id', 'firstname', 'lastname', 'gender', 'facebook_auth_id']
        }).then(function(user) {
          // If the user does not exist create one
          if (!user) {
            Users.build({
              email: profile.emails[0].value,
              role: 'user',
              username: profile.username,
              facebook_auth_id: profile.id,
              facebook_auth_token: accessToken,
              gender: profile.gender
              // facebook: profile._json
            })
              .setFullName(profile.displayName)
              .save()
              .then(function(user) {
                done(null, user);
              })
              .catch(function(err) {
                if (err) {
                  return done(err);
                }
              });
          }
          // The user was found, redirect to homepage
          else {
            done(null, profile);
          }
        })
          .catch(function(err) {
            if (err) {
              return done(err);
            }
          });

      });
    }
  ));

};
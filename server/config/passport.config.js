module.exports = {
  'FACEBOOK': {
    clientID: process.env.FACEBOOK_ID || '245699389128451',
    clientSecret: process.env.FACEBOOK_SECRET ||
      '1493998cc7816b1624bcbb7d1ee96331',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL ||
      'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'name', 'displayName', 'photos', 'gender', 'email']
  },
  'GOOGLE': {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }
};

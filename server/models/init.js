// instantiate the database connection
var sequelize = require('../config/db-connect'),
  ucFirst = require('../services/ucfirst'),
  relationships = require('./relationships');

// load models
var models = [
  'categories',
  'events',
  'images',
  'messages',
  'notifications',
  'reviews',
  'rsvp',
  'users'
];

// add them to be exported in one go
models.forEach(function(model) {
  module.exports[ucFirst(model)] = sequelize.import(__dirname + '/' + model);
});

// instantiate the relationships
relationships(module.exports);

// export connection
module.exports.sequelize = sequelize;

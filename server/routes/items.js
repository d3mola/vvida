(function() {
  'use strict';
  // Items api
  // this api will handle all the routes for items
  module.exports = function(app, auth) {
    var Items = require('../controllers/items')(app);

    app.route('/api/items')
      // create item .
      .post(auth.authenticate, Items.create)
      .get(Items.all);

    // get popular Items
    app.route('/api/items/popular')
      .get(Items.popularItems);

    app.route('/api/items/:id')
      // read items
      .get(Items.find)
      // Update items
      .put(auth.authenticate, Items.update)
      // Delete items
      .delete(auth.authenticate, Items.delete);
  };

})();

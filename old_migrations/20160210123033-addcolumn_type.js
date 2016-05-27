(function() {

  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn('Categories', 'type', {
        type: Sequelize.STRING,
        validate: {
          isIn: {
            args: [
              ['Item', 'Event']
            ],
            msg: 'Must be either Item, Event'
          }
        },
        allowNull: true
      });
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();

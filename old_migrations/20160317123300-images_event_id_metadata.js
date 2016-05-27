(function() {

  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.changeColumn(
        'Images',
        'event_id', {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      );
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();

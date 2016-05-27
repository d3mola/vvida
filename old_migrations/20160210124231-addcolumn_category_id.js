(function() {

  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn('Events', 'category_id', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();

(function() {

  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn('Items', 'email', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();

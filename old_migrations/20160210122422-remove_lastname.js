(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface) {
      return queryInterface.removeColumn('Users', 'lastname');
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();

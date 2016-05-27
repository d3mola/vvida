(function() {

  'use strict';

  module.exports = {
    up: function(queryInterface) {
      return queryInterface.renameColumn('Users', 'firstname', 'name');
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();

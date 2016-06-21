(function() {
  'use strict';

  module.exports = {
    up: function (queryInterface, Sequelize) {
      /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
      return queryInterface.renameColumn('Events', 'time', 'start_time')
        .then(function() {
          return queryInterface.addColumn(
            'Events',
            'end_time',
            { type: Sequelize.DATE }
          );
        });
    },

    down: function (queryInterface) {
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.dropTable('users');
      */
     
      return queryInterface.removeColumn('Events', 'end_time')
        .then(function() {
          return queryInterface.renameColumn('Events', 'start_time', 'time');
        });
    }
  };
})();
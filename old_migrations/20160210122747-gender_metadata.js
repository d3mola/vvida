(function() {

  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.changeColumn(
        'Users',
        'gender', {
          type: Sequelize.STRING,
          validate: {
            isIn: {
              args: [
                ['Male', 'Female', 'Hidden']
              ],
              msg: 'Must be either Male, Female or Hidden'
            }
          },
          allowNull: true,
          defaultValue: 'Hidden'
        }
      );
    }

    // down: function(queryInterface, Sequelize) {

    // }
  };
})();

(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Notifications', {
          // id
          id: {
            type: Sequelize.INTEGER,
            autoincrement: true
          },
          // holds the name of the notifications
          notification: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
        },
        // table configuration
        {
          // prevent time stamps from using camelase
          timestamps: true,
          // updatedAt to updated_at and createdAt to created-at
          underscored: true,
          // prevent sequelize from transforming the user tables to prural
          freezetableName: true
        });
    },
    down: function(queryInterface) {
      return queryInterface.dropTable('Notifications');
    }
  };
})();

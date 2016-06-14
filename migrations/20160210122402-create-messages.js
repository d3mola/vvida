(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Messages', {
          // id 
          id: {
            type: Sequelize.INTEGER,
            autoincrement: true
          },
          // item name
          // hold the name of the messages
          message: {
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
          receiver_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          }
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
      return queryInterface.dropTable('Messages');
    }
  };
})();

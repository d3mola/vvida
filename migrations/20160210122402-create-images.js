(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Images', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          public_id: {
            type: Sequelize.STRING,
            allowNull: false
          },

          img_url: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
          },
          // user_id
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          event_id: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          item_id: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
        },
        // table configuration
        {
          // prevent timestamps from using camelase
          timestamps: true,
          // updatedAt to updated_at and createdAt to created-at
          underscored: true,
          // prevent sequelize from transforming the user tables to plural
          freezetableName: true
        });
    },

    down: function(queryInterface) {
      return queryInterface.dropTable('Images');
    }
  };
})();

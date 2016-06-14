(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Reviews', {
          // id
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          review: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          review_title: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          item_id: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          event_id: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
          }
        },
        // table configuration
        {
          // prevent time stamps from using camelase
          // updatedAt to updated_at and createdAt to created-at
          timestamps: true,
          underscored: true,
          // prevent sequelize from transforming the user tables to prural
          freezetableName: true
        });
    },
    down: function(queryInterface) {
      return queryInterface.dropTable('Reviews');
    }
  };
})();

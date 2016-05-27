(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Items', {
          // id
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          // user_id
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          // category id
          category_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          // item name
          // hold the name of the items
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          // item description
          // gives a detailed description of what the item is all about
          description: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          city: {
            type: Sequelize.STRING,
            allowNull: true
          },
          street: {
            type: Sequelize.STRING,
            allowNull: true
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: true
          },
          email: {
            type: Sequelize.STRING,
            allowNull: true
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
          underscored: true,
          // enabling timestamps
          timestamps: true,
          // prevent sequelize from transforming the user tables to prural
          freezetableName: true
        });
    },

    down: function(queryInterface) {
      return queryInterface.dropTable('Items');
    }
  };
})();

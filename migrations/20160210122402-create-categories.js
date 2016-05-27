(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('Categories', {
          // id
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          // Type of the category
          // e.g product, service, location
          type: {
            type: Sequelize.STRING,
            validate: {
              isIn: {
                args: [
                  ['Item', 'Event']
                ],
                msg: 'Must be either Item, Event'
              }
            },
            allowNull: false
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          sub_cat_id: {
            type: Sequelize.INTEGER,
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
          // prevent timestamps from using camelase
          timestamps: true,
          // updatedAt to updated_at and createdAt to created-at
          underscored: true,
          // prevent sequelize from transforming the user tables to plural
          freezetableName: true
        });
    },

    down: function(queryInterface) {
      return queryInterface.dropTable('Categories');
    }
  };
})();
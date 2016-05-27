(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('ItemPromotions', {
          // id
          id: {
            type: Sequelize.INTEGER,
            autoincrement: true
          },
          // e.g sponsored, shared, recommended
          group: {
            type: Sequelize.STRING,
            validate: {
              isIn: {
                args: [
                  ['sponsored', 'shared', 'recommended']
                ],
                msg: 'Must be either sponsored, shared or recommended.'
              },
            },
            allowNull: false,
            defaultValue: 'recommended'
          },
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
          },
          item_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          created_by: {
            type: Sequelize.DATE
          },
          created_for: {
            type: Sequelize.DATE
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
      return queryInterface.dropTable('ItemPromotions');
    }
  };
})();

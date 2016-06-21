module.exports = function(sequelize, DataType) {
  return sequelize.define('Events', {

      // event name
      // hold the name of the events
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      // description
      description: {
        type: DataType.TEXT,
        allowNull: false
      },

      // location of the event
      location: {
        type: DataType.TEXT,
        allowNull: false
      },

      // venue of the event
      venue: {
        type: DataType.TEXT,
        allowNull: false
      },

      // start time
      start_time: {
        type: DataType.DATE
      },
      
      // end time
      end_time: {
        type: DataType.DATE
      },

      // event sponsors
      sponsor: {
        type: DataType.TEXT,
        allowNull: true
      }

    },
    // table configuration
    {
      // prevent time stamps from using camelase
      // updatedAt to updated_at and createdAt to created-at
      underscored: true,
      // prevent sequelize from transforming the user tables to prural
      freezetableName: true
    });
};

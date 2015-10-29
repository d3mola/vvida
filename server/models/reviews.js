module.exports = function(sequelize, DataType) {
  return sequelize.define('Reviews', {
      review: {
        type: DataType.TEXT,
        allowNull: false
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

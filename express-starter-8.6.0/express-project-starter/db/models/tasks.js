'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    taskName: DataTypes.STRING,
    listId: DataTypes.INTEGER
  }, {});
  Tasks.associate = function (models) {
    // associations can be defined here
    Tasks.belongsTo(models.Lists, { foreignKey: 'listId' });

  };
  return Tasks;
};

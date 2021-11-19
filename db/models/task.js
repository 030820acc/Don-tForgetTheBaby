'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskName: DataTypes.STRING,
    taskTime: DataTypes.INTEGER,
    listId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.List, { foreignKey: 'listId' });
    Task.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Task;
};

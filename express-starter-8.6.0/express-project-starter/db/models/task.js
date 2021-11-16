'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskName: DataTypes.STRING,
    listId: DataTypes.INTEGER
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.List, { foreignKey: 'listId' });

  };
  return Task;
};

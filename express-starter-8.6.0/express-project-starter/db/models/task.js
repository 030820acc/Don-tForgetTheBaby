'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Tasks', {
    taskName: DataTypes.STRING,
    listId: DataTypes.INTEGER
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Lists, { foreignKey: 'listId' });

  };
  return Task;
};

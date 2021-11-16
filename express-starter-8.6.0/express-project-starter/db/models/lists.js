'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define('Lists', {
    listName: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {});
  Lists.associate = function (models) {
    // associations can be defined here
    Lists.belongsTo(models.Users, { foreignKey: 'userId' });
    Lists.hasMany(models.Tasks, { foreignKey: 'listId' });


  };
  return Lists;
};

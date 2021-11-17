'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    listName: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {});
  List.associate = function (models) {
    // associations can be defined here
    List.belongsTo(models.User, { foreignKey: 'userID' });
    List.hasMany(models.Task, { foreignKey: 'listId' });


  };
  return List;
};

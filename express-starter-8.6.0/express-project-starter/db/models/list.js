'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('Lists', {
    listName: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {});
  List.associate = function (models) {
    // associations can be defined here
    List.belongsTo(models.Users, { foreignKey: 'userId' });
    List.hasMany(models.Tasks, { foreignKey: 'listId' });


  };
  return List;
};

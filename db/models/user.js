'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.List, { foreignKey: 'userId' });
    User.hasMany(models.Task, { foreignKey: 'userId' });
  };
  return User;
};

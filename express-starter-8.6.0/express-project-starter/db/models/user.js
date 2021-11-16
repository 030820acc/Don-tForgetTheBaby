'use strict';
module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD:express-starter-8.6.0/express-project-starter/db/models/users.js
  const User = sequelize.define('Users', {
    name: DataTypes.STRING,
=======
  const User = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
>>>>>>> main:express-starter-8.6.0/express-project-starter/db/models/user.js
    hashedPassword: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Lists, { foreignKey: 'userId' });

  };
  return User;
};

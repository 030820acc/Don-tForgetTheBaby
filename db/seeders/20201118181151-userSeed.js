'use strict';
const bcrypt = require("bcryptjs")

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
   return queryInterface.bulkInsert('Users', [
    {
      firstName: 'Demo',
      lastName: 'User',
      username: 'demo_user',
      email: 'demo_user@email.com',
      hashedPassword: bcrypt.hashSync('demo'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';

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
   return queryInterface.bulkInsert('Lists', [
     { listName: 'Completed Tasks', userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { listName: 'Groceries', userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { listName: 'Chores', userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { listName: 'Work To-Do\'s', userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { listName: 'Favors for Friends', userId: 1, createdAt: new Date(), updatedAt: new Date() },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Lists', null, {});
  }
};

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
   return queryInterface.bulkInsert('Tasks', [
     { taskName: 'Buy Milk', listId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Pick up eggs', listId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Laundry', listId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Cook dinner', listId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Vacuum', listId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Write code', listId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Debug ex-coworker\'s project', listId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Sous vide center cut filet mignon', listId: 4, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Boost to Diamond', listId: 4, userId: 1, createdAt: new Date(), updatedAt: new Date() },
   ], {});
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
   return queryInterface.bulkDelete('Tasks', null, {});
  }
};

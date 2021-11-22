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
     { taskName: 'Buy Milk', taskTime: 5, listId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Pick up eggs', taskTime: 5, listId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Laundry', taskTime: 45, listId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Cook dinner', taskTime: 60, listId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Vacuum', taskTime: 30, listId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Write code', taskTime: 120, listId: 4, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Debug ex-coworker\'s project', taskTime: 60, listId: 4, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Sous vide center cut filet mignon', taskTime: 120, listId: 5, userId: 1, createdAt: new Date(), updatedAt: new Date() },
     { taskName: 'Boost to Diamond', taskTime: 1440, listId: 5, userId: 1, createdAt: new Date(), updatedAt: new Date() },
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

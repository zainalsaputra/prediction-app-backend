/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('roles', [{
      id: 'af5f62b1-1d76-4534-bb81-6ce4fd82e9c1',
      name: 'admin',
    }]);

    await queryInterface.bulkInsert('roles', [{
      id: 'bf5f62b1-1d76-4534-bb81-6ce4fd82e9c2',
      name: 'user',
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('roles', null, {});
  },
};

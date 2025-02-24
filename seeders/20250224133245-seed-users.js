'use strict';

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
    // const hashedPassword1 = await bcrypt.hash('password123', 10);
    // const hashedPassword2 = await bcrypt.hash('password456', 10);
    const password = 'password';

    await queryInterface.bulkInsert('users', [
      {
        // id: Sequelize.literal('uuid_generate_v4()'),
        id: 'b077733d-e727-4cd5-8a6c-88f98f59d7b1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: password,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: Sequelize.literal('uuid_generate_v4()'),
        id: 'b077733d-e727-4cd5-8a6c-88f98f59d7b2',
        name: 'Regular User',
        email: 'user@example.com',
        password: password,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};

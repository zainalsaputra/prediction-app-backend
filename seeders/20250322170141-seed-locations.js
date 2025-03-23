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

    await queryInterface.bulkInsert('locations', [
      {
        // id: Sequelize.literal('uuid_generate_v4()'),
        id: '2dc6e816-5599-4bd0-a690-74a5b5d05eea',
        province: 'Jawa Timur',
        district: 'Kota Malang',
        subdistrict: 'Sukun',
        village: 'Bandulan'
      },
      {
        // id: Sequelize.literal('uuid_generate_v4()'),
        id: '2dc6e816-5599-4bd0-a690-74a5b5d05eeb',
        province: 'Jakarta',
        district: 'Jakarta Pusat',
        subdistrict: 'Gambir',
        village: 'Cemara'
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
    await queryInterface.bulkDelete('locations', null, {});
  }
};

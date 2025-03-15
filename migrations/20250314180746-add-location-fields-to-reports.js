'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('reports', 'district', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('reports', 'subdistrict', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('reports', 'village', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('reports', 'address_detail', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.renameColumn('reports', 'region', 'province');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('reports', 'province', 'region');
    await queryInterface.removeColumn('reports', 'district');
    await queryInterface.removeColumn('reports', 'subdistrict');
    await queryInterface.removeColumn('reports', 'village');
  },
};

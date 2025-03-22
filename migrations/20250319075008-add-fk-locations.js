'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('reports', {
      fields: ['locationId'],
      type: 'foreign key',
      name: 'fk_reports_location',
      references: {
        table: 'locations',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('reports', 'fk_reports_location');
  }
};

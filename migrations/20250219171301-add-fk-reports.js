'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('reports', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_reports_users',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('reports', 'fk_reports_users');
  },
};

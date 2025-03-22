'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('notifications', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_notifications_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('notifications', {
      fields: ['postReportId'],
      type: 'foreign key',
      name: 'fk_notifications_postReportId',
      references: {
        table: 'post_reports',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('notifications', 'fk_notifications_userId');
    await queryInterface.removeConstraint('notifications', 'fk_notifications_postReportId');
  },
};

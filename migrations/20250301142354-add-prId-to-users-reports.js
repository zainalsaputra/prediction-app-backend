'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('post_reports', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk_post_reports_postId',
      references: {
        table: 'reports',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('post_reports', {
      fields: ['reportedBy'],
      type: 'foreign key',
      name: 'fk_post_reports_reportedBy',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('post_reports', 'fk_post_reports_postId');
    await queryInterface.removeConstraint('post_reports', 'fk_post_reports_reportedBy');
  },
};


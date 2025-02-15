/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const Roles = require('../models/roles');

const roles = new Roles(Sequelize);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'roles',
      roles.defineSchema(),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.removeColumn('reports', 'province');
    await queryInterface.removeColumn('reports', 'district');
    await queryInterface.removeColumn('reports', 'subdistrict');
    await queryInterface.removeColumn('reports', 'village');

    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      province: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      subdistrict: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      village: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addColumn('reports', 'locationId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'locations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('reports', 'locationId');

    await queryInterface.dropTable('locations');

    await queryInterface.addColumn('reports', 'province', {
      type: Sequelize.STRING,
      allowNull: true,
    });

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
  }
};

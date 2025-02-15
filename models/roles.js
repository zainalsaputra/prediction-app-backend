const { Sequelize } = require('sequelize');
const Models = require('./models');

class Roles extends Models {
  constructor(dataTypes) {
    super(dataTypes);
  }

  defineSchema() {
    return this.createModel({
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: this.dataTypes.INTEGER,
        // type: this.dataTypes.UUID,
        // defaultValue: Sequelize.UUIDV4,
        // defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        allowNull: false,
        type: this.dataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: this.dataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: this.dataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  }
}

module.exports = Roles;

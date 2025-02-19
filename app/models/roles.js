const { Model, DataTypes, Sequelize } = require('sequelize');

class Roles extends Model {
  static associate(models) {
    this.hasMany(models.Users, { foreignKey: 'roleId', as: 'users' });
  }

  static initModel(sequelize) {
    Roles.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        modelName: 'Roles',
        tableName: 'roles',
        timestamps: true,
      }
    );
  }
}

module.exports = Roles;

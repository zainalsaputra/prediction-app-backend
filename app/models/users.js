const { Model, DataTypes, Sequelize } = require('sequelize');

class Users extends Model {
  static associate(models) {
    this.belongsTo(models.Roles, { foreignKey: 'roleId', as: 'role' });
    this.hasMany(models.Reports, { foreignKey: 'userId', as: 'reports' });
  }

  static initModel(sequelize) {
    Users.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        refreshToken: {
          allowNull: true,
          type: DataTypes.TEXT,
        },
        roleId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'Roles',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
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
        modelName: 'Users',
        tableName: 'users',
        timestamps: true,
      }
    );
  }
}

module.exports = Users;

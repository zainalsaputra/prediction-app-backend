const { Model, DataTypes, Sequelize } = require('sequelize');

class Reports extends Model {
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  }

  static initModel(sequelize) {
    Reports.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        image: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        type_report: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        description: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        location: {
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
        modelName: 'Reports',
        tableName: 'reports',
        timestamps: true,
      }
    );
  }
}

module.exports = Reports;

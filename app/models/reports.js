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
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        image: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        type_report: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        description: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        region: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        longitude: {
          allowNull: false,
          type: DataTypes.DECIMAL(11, 8),
        },
        latitude: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 8),
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('NOW'), 
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('NOW'),
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

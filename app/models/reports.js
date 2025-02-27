const { Model, DataTypes, Sequelize } = require('sequelize');
const moment = require('moment');

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
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'"),
          get() {
            return moment.utc(this.getDataValue("createdAt")).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
          },
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'"),
          get() {
            return moment.utc(this.getDataValue("updatedAt")).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
          },
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

const { Model, DataTypes, Sequelize } = require('sequelize');

class Locations extends Model {
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    this.hasMany(models.Reports, { foreignKey: 'locationId', as: 'reports' });
  }

  static initModel(sequelize) {
    Locations.init(
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
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        province: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        district: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        subdistrict: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        village: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'"),
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'"),
        },
      },
      {
        sequelize,
        modelName: 'Locations',
        tableName: 'locations',
        timestamps: true,
      }
    );
  }
}

module.exports = Locations;

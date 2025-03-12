const { Model, DataTypes, Sequelize } = require('sequelize');
const moment = require('moment');

class Notifications extends Model {
    static associate(models) {
        this.belongsTo(models.Users,
            { foreignKey: 'userId', as: 'user' }
        );
        this.belongsTo(models.PostReports,
            { foreignKey: 'postReportId', as: 'postReports' }
        );
    }

    static initModel(sequelize) {
        Notifications.init(
            {
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
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                postReportId: {
                    allowNull: false,
                    type: Sequelize.UUID,
                    references: {
                        model: 'post_reports',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                message: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                isRead: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
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
                modelName: 'Notifications',
                tableName: 'notifications',
                timestamps: true,
            }
        );
    }
}

module.exports = Notifications;

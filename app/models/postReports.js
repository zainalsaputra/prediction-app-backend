const { Model, DataTypes, Sequelize } = require('sequelize');
const moment = require('moment');

class PostReport extends Model {
    static associate(models) {
        this.belongsTo(models.Reports,
            { foreignKey: 'postId', as: 'post' }
        );
        this.belongsTo(models.Users,
            { foreignKey: 'reportedBy', as: 'reporter' }
        );
    }

    static initModel(sequelize) {
        PostReport.init(
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.literal('uuid_generate_v4()'),
                },
                postId: {
                    allowNull: false,
                    type: DataTypes.UUID,
                    references: {
                        model: 'Reports',
                        key: 'id',
                    },
                },
                reportedBy: {
                    allowNull: false,
                    type: DataTypes.UUID,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                },
                reason: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                status: {
                    allowNull: false,
                    type: DataTypes.ENUM('Pending', 'Reviewed', 'Resolved'),
                    defaultValue: 'Pending',
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
                modelName: 'PostReport',
                tableName: 'post_reports',
                timestamps: true,
            }
        );
    }
}

module.exports = PostReport;

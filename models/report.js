const { Sequelize } = require('sequelize');
const Models = require('./models');

class Report extends Models {
    constructor(dataTypes) {
        super(dataTypes);
    }

    defineSchema() {
        return this.createModel({
            id: {
                allowNull: false,
                primaryKey: true,
                type: this.dataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
            },
            image: {
                allowNull: false,
                type: this.dataTypes.STRING,
            },
            type_report: {
                allowNull: false,
                type: this.dataTypes.STRING,
            },
            description: {
                allowNull: false,
                type: this.dataTypes.STRING,
            },
            location: {
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

module.exports = Report;

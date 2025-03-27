const Reports = require('../models/reports');
const Users = require('../models/users');
const Locations = require('../models/locations');

class StatisticServices {
    static async getReportStatistics({ province, district, subdistrict, village }) {
        let filterConditions = {};

        if (province) filterConditions.province = province;
        if (district) filterConditions.district = district;
        if (subdistrict) filterConditions.subdistrict = subdistrict;
        if (village) filterConditions.village = village;

        const reports = await Reports.findAll({
            include: [
                {
                    model: Locations,
                    as: 'location',
                    where: filterConditions,
                    attributes: [],
                },
            ],
            attributes: [
                'type_report',
                [Sequelize.fn('COUNT', Sequelize.col('type_report')), 'count']
            ],
            group: ['type_report']
        });

        return reports.map(r => ({
            category: r.type_report,
            count: r.getDataValue('count')
        }));
    }

    static async getUserLocationStatistics({ province, district, subdistrict, village }) {
        let filterConditions = {};

        if (province) filterConditions.province = province;
        if (district) filterConditions.district = district;
        if (subdistrict) filterConditions.subdistrict = subdistrict;
        if (village) filterConditions.village = village;

        const users = Users.findAll({
            include: [{
                model: Locations,
                as: 'location',
                attributes: [],
                where: filterConditions,
            }],
            attributes: [
                'type_report',
                [Sequelize.fn('COUNT', Sequelize.col('type_report')), 'count']
            ],
            group: ['type_report']
        });

        return users.map(r => ({
            category: r.category,
            count: r.getDataValue('count')
        }));
    }

}

module.exports = StatisticServices;
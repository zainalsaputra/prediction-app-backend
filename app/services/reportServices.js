const { Op } = require('sequelize');
const Reports = require('../models/reports');
const Users = require('../models/users');
const moment = require('moment-timezone');
const { Sequelize } = require('../models');

class ReportsService {

  static async createReport(body) {
    const result = await Reports.create(body);
    return result;
  }

  static async getFilteredReports({ type_report, province, district, subdistrict, village, userId, startDate, endDate, sortBy, order }) {
    let filterConditions = {};

    if (type_report) {
      filterConditions.type_report = { [Op.iLike]: `%${type_report}%` };
    }
    if (province) {
      filterConditions.province = { [Op.iLike]: `%${province}%` };
    }
    if (district) {
      filterConditions.district = { [Op.iLike]: `%${district}%` };
    }
    if (subdistrict) {
      filterConditions.subdistrict = { [Op.iLike]: `%${subdistrict}%` };
    }
    if (village) {
      filterConditions.village = { [Op.iLike]: `%${village}%` };
    }
    if (userId) {
      filterConditions.userId = userId;
    }

    if (startDate && endDate) {

      const startUTC = moment.tz(startDate, "Asia/Jakarta").startOf('day').utc().format();
      const endUTC = moment.tz(endDate, "Asia/Jakarta").endOf('day').utc().format();

      filterConditions.createdAt = { [Op.between]: [startUTC, endUTC] };
    } else if (startDate) {
      const startUTC = moment.tz(startDate, "Asia/Jakarta").startOf('day').utc().format();
      filterConditions.createdAt = { [Op.gte]: startUTC };
    } else if (endDate) {
      const endUTC = moment.tz(endDate, "Asia/Jakarta").endOf('day').utc().format();
      filterConditions.createdAt = { [Op.lte]: endUTC };
    }

    const validSortFields = ['createdAt', 'updatedAt', 'type_report', 'province'];
    if (!validSortFields.includes(sortBy)) {
      sortBy = 'createdAt';
    }

    const validOrders = ['ASC', 'DESC'];
    if (!validOrders.includes(order?.toUpperCase())) {
      order = 'DESC';
    }

    return await Reports.findAll({
      where: filterConditions,
      order: [[sortBy, order.toUpperCase()]],
    });
  }


  static async getReportById(id) {
    return await Reports.findOne(
      {
        where: { id }
      },
    );
  }

  static async getReportsByUserId(userId) {
    return await Users.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: Reports,
          as: 'reports',
          // attributes: ['id', 'type_report', 'description', 'province', 'longitude', 'latitude', 'image', 'createdAt', 'updatedAt',],
        },
      ],
      order: [['reports', 'updatedAt', 'DESC']],
    });
  }

  static async updateReport(id, body) {
    const updated = await Reports.update(body,
      {
        where: { id },
        returning: true,
      }
    );

    return updated;
  }

  static async deleteReport(id) {
    return await Reports.destroy({ where: { id } });
  }

  static async checkPostExists(postId) {
    const post = await Reports.findOne({ where: { id: postId } });
    return post !== null;
  }

  static async getReportStatistics({ province, district, subdistrict, village }) {
    let filterConditions = {};

    if (province) filterConditions.province = province;
    if (district) filterConditions.district = district;
    if (subdistrict) filterConditions.subdistrict = subdistrict;
    if (village) filterConditions.village = village;

    const reports = await Reports.findAll({
      where: filterConditions,
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

}

module.exports = ReportsService;

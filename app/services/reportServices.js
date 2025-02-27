const { Op } = require('sequelize');
const Reports = require('../models/reports');
const Users = require('../models/users');
const moment = require('moment-timezone'); 

class ReportsService {

  static async createReport(body) {
    const result = await Reports.create(body);
    return result;
  }

  static async getFilteredReports({ type_report, region, userId, startDate, endDate, sortBy, order }) {
      let filterConditions = {};
  
      if (type_report) {
        filterConditions.type_report = { [Op.iLike]: `%${type_report}%` };
      }
      if (region) {
        filterConditions.region = { [Op.iLike]: `%${region}%` };
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
  
      const validSortFields = ['createdAt', 'updatedAt', 'type_report', 'region'];
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
    return await Reports.findOne({ where: { id } });
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
          attributes: ['id', 'type_report', 'description', 'region', 'longitude', 'latitude', 'image', 'createdAt', 'updatedAt'],
        },
      ],
    });
  }

  static async updateReport(id, body) {
    const [updated] = await Reports.update(body, { where: { id } });

    return updated;
  }

  static async deleteReport(id) {
    return await Reports.destroy({ where: { id } });
  }
}

module.exports = ReportsService;

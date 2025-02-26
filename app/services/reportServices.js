const Reports = require('../models/reports');
const Users = require('../models/users');

class ReportsService {

  static async createReport(body) {
    const result = await Reports.create(body);
    return result;
  }

  static async getAllReports(filters = {}) {
    return await Reports.findAll({
      where: filters,
      order: [['createdAt', 'DESC']],
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
          attributes: ['id', 'type_report', 'description', 'region','longitude', 'latitude', 'image', 'createdAt', 'updatedAt'],
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

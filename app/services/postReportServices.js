const { Op } = require('sequelize');
const PostReports = require('../models/postReports');
const db = require('../models');
const { Users, Reports } = db;
const moment = require('moment-timezone');

class postReportsService {

  static async createPostReport(body) {
    const result = await PostReports.create(body);
    return result;
  }

  static async getFilteredPostReports({ status, reportedBy, postId, reason, startDate, endDate, sortBy, order }) {
    let filterConditions = {};

    if (postId) {
      filterConditions.postId = { [Op.iLike]: `%${postId}%` };
    }
    if (status) {
      filterConditions.status = { [Op.iLike]: `%${status}%` };
    }
    if (reportedBy) {
      filterConditions.reportedBy = { [Op.iLike]: `%${reportedBy}%` };
    }
    if (reason) {
      filterConditions.reason = { [Op.iLike]: `%${reason}%` };
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

    return await PostReports.findAll({
      where: filterConditions,
      order: [[sortBy, order.toUpperCase()]],
      attributes: ['createdAt', 'updatedAt', 'id', 'reason', 'status'],
      include: [
        {
          model: Users,
          as: 'reporter',
          attributes: ['createdAt', 'updatedAt', 'id', 'name', 'email']
        },
        {
          model: Reports,
          as: 'post',
        }
      ]
    });
  }

  static async getPostReportById(id) {
    return await PostReports.findOne({ where: { id } });
  }

  static async updatePostReport(id, body) {
    const [updated] = await PostReports.update(body, { where: { id } });

    return updated;
  }

  static async deletePostReport(id) {
    return await PostReports.destroy({ where: { id } });
  }
}

module.exports = postReportsService;

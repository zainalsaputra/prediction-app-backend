const { sequelize } = require('../models');
const Reports = require('../models/reports');
const Users = require('../models/users');

class ReportsService {
  /**
   * Membuat laporan baru
   */
  static async createReport(body) {
    const result = await sequelize.transaction(async (t) => {
      return await Reports.create(body, { transaction: t });
    });

    return result;
  }

  /**
   * Mendapatkan semua laporan
   */
  static async getAllReports(filters = {}) {
    return await Reports.findAll({
      where: filters,
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Mendapatkan laporan berdasarkan ID
   */
  static async getReportById(id) {
    return await Reports.findOne({ where: { id } });
  }

  /**
     * Mendapatkan laporan berdasarkan UserID
     */
  static async getReportsByUserId(userId) {
    return await Users.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: Reports,
          as: 'reports', 
          attributes: ['id', 'type_report', 'description', 'location', 'image', 'createdAt', 'updatedAt'],
        },
      ],
    });
  }

  /**
   * Memperbarui laporan berdasarkan ID
   */
  static async updateReport(id, body) {
    const [updated] = await Reports.update(body, { where: { id } });

    return updated;
  }

  /**
   * Menghapus laporan berdasarkan ID
   */
  static async deleteReport(id) {
    return await Reports.destroy({ where: { id } });
  }
}

module.exports = ReportsService;

const Reports = require('../models/reports');
const { sequelize } = require('../models');

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
   * Memperbarui laporan berdasarkan ID
   */
  static async updateReport(id, body) {
    const [updated] = await Reports.update(body, { where: { id } });

    return updated; // return jumlah baris yang diperbarui
  }

  /**
   * Menghapus laporan berdasarkan ID
   */
  static async deleteReport(id) {
    return await Reports.destroy({ where: { id } });
  }
}

module.exports = ReportsService;

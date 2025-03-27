const { Op } = require('sequelize');
const Reports = require('../models/reports');
const Users = require('../models/users');
const Locations = require('../models/locations');
const moment = require('moment-timezone');
const { Sequelize } = require('../models');

class ReportsService {

  static async createReport(body) {
    const { province, district, subdistrict, village, userId, ...reportData } = body;

    const location = await Locations.create({
      userId,
      province,
      district,
      subdistrict,
      village,
    });

    const report = await Reports.create({
      ...reportData,
      userId,
      locationId: location.id,
    });

    return report;
  }


  static async getFilteredReports({ type_report, province, district, subdistrict, village, userId, startDate, endDate, sortBy, order }) {
    let filterConditions = {};
    let locationConditions = {};

    // Filter laporan berdasarkan jenis laporan
    if (type_report) {
      filterConditions.type_report = { [Op.iLike]: `%${type_report}%` };
    }
    if (userId) {
      filterConditions.userId = userId;
    }

    // Filter lokasi berdasarkan lokasi yang dipilih
    if (province) {
      locationConditions.province = { [Op.iLike]: `%${province}%` };
    }
    if (district) {
      locationConditions.district = { [Op.iLike]: `%${district}%` };
    }
    if (subdistrict) {
      locationConditions.subdistrict = { [Op.iLike]: `%${subdistrict}%` };
    }
    if (village) {
      locationConditions.village = { [Op.iLike]: `%${village}%` };
    }

    // Filter berdasarkan rentang waktu
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

    // Validasi sorting
    const validSortFields = ['createdAt', 'updatedAt', 'type_report'];
    if (!validSortFields.includes(sortBy)) {
      sortBy = 'createdAt';
    }

    const validOrders = ['ASC', 'DESC'];
    if (!validOrders.includes(order?.toUpperCase())) {
      order = 'DESC';
    }

    return await Reports.findAll({
      where: filterConditions,
      include: [
        {
          model: Locations,
          as: 'location',
          where: locationConditions, // Filter lokasi di tabel locations
          attributes: ['province', 'district', 'subdistrict', 'village']
        }
      ],
      order: [[sortBy, order.toUpperCase()]],
    });
  }

  static async getReportById(id) {
    return await Reports.findOne(
      {
        where: { id },
        include: [
          {
            model: Locations,
            as: 'location',
            attributes: ['province', 'district', 'subdistrict', 'village']
          }
        ]
      },
    );
  }

  static async getReportsByUserId(userId) {
    return await Users.findOne({
      where: {
        id: userId,
      },
      attributes: ['createdAt', 'updatedAt', 'id', 'name', 'email'],
      include: [
        {
          model: Reports,
          as: 'reports',
          // attributes: ['id', 'type_report', 'description', 'province', 'longitude', 'latitude', 'image', 'createdAt', 'updatedAt',],
          include: [
            {
              model: Locations,
              as: 'location',
              attributes: ['province', 'district', 'subdistrict', 'village']
            },
          ]
        },
      ],
      order: [['reports', 'updatedAt', 'DESC']],
    });
  }

  static async updateReport(id, body) {
    const report = await Reports.findOne({
      where: { id },
      include: [{ model: Locations, as: 'location' }]
    });

    if (!report) {
      throw new Error('Report not found!');
    }

    const updatedReport = await Reports.update(
      {
        type_report: body.type_report,
        description: body.description,
        address_detail: body.address_detail,
        longitude: body.longitude,
        latitude: body.latitude,
        image: body.image
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (body.province || body.district || body.subdistrict || body.village) {
      await Locations.update(
        {
          province: body.province || report.location?.province,
          district: body.district || report.location?.district,
          subdistrict: body.subdistrict || report.location?.subdistrict,
          village: body.village || report.location?.village,
        },
        {
          where: { id: report.locationId },
          returning: true,
        }
      );
    }

    return updatedReport;
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


}

module.exports = ReportsService;

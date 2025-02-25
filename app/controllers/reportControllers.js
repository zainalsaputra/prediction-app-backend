const fs = require('fs');
const createError = require('http-errors');

const {
    createReportSchema,
    getReportByIdSchema,
    updateReportSchema,
    updateTypeReportSchema,
    deleteReportSchema
} = require('../validations/reportValidations');

const ReportService = require('../services/reportServices');
const UsersServices = require('../services/usersServices');

class ReportsController {
    static async createReport(req, res, next) {
        try {
            const { error } = createReportSchema.validate(req.body);
            if (error) {
                if (req.file) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                }
                return next(createError(400, error.details[0].message));
            }

            const userExists = await UsersServices.checkUserExists(req.body.userId);
            if (!userExists) {
                return next(createError(404, 'User is not registered in our database!'));
            }

            const imagePath = req.file ? req.file.path : null;

            const reportData = {
                ...req.body,
                image: imagePath
            };

            const response = await ReportService.createReport(reportData);

            return res.status(201).json({
                status: 'success',
                message: 'Report created successfully!',
                data: response,
            });

        } catch (error) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            next(error);
        }
    }

    static async getAllReports(req, res, next) {
        try {
            const reports = await ReportService.getAllReports();
            const baseUrl = `${req.protocol}://${req.get('host')}/`;

            const reportsWithImageUrls = reports.map(report => {
                const reportData = report.toJSON();
                return {
                    id: reportData.id,
                    userId: reportData.userId,
                    image: reportData.image ? `${baseUrl}${reportData.image.replace(/\\/g, '/')}` : null,
                    type_report: reportData.type_report,
                    description: reportData.description,
                    region: reportData.region,
                    longitude: reportData.longitude,
                    latitude: reportData.latitude,
                    createdAt: reportData.createdAt,
                    updatedAt: reportData.updatedAt,
                };
            });

            return res.status(200).json({
                status: 'success',
                data: reportsWithImageUrls
            });

        } catch (error) {
            next(error);
        }
    }

    static async getReportById(req, res, next) {
        try {
            const reportId = req.params.id;
            const { error } = getReportByIdSchema.validate({ id: reportId });

            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const report = await ReportService.getReportById(reportId);
            if (!report) {
                return next(createError(404, 'Report not found!'));
            }

            const baseUrl = `${req.protocol}://${req.get('host')}/`;
            const reportData = report.toJSON();

            const formattedReport = {
                id: reportData.id,
                userId: reportData.userId,
                image: reportData.image ? `${baseUrl}${reportData.image.replace(/\\/g, '/')}` : null,
                type_report: reportData.type_report,
                description: reportData.description,
                region: reportData.region,
                longitude: reportData.longitude,
                latitude: reportData.latitude,
                createdAt: reportData.createdAt,
                updatedAt: reportData.updatedAt,
            };

            return res.status(200).json({
                status: 'success',
                data: formattedReport
            });

        } catch (error) {
            next(error);
        }
    }

    static async getReportsByUserId(req, res, next) {
        try {
            const userId = req.params.userId;
            const { error } = getReportByIdSchema.validate({ id: userId });

            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const response = await ReportService.getReportsByUserId(userId);
            if (!response || response.length === 0) {
                return next(createError(404, 'No reports found for this user'));
            }

            const baseUrl = `${req.protocol}://${req.get('host')}/`;

            const reportsWithImageUrls = response.reports.map(report => {
                const reportData = report.toJSON();
                return {
                    id: reportData.id,
                    userId: reportData.userId,
                    image: reportData.image ? `${baseUrl}${reportData.image.replace(/\\/g, '/')}` : null,
                    type_report: reportData.type_report,
                    description: reportData.description,
                    region: reportData.region,
                    longitude: reportData.longitude,
                    latitude: reportData.latitude,
                    createdAt: reportData.createdAt,
                    updatedAt: reportData.updatedAt,
                };
            });

            return res.status(200).json({
                status: 'success',
                data: {
                    user: {
                        id: response.id,
                        name: response.name,
                        email: response.email,
                        createdAt: response.createdAt,
                        updatedAt: response.updatedAt
                    },
                    reports: reportsWithImageUrls
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async updateReport(req, res, next) {
        try {
            const reportId = req.params.id;

            const { error } = updateReportSchema.validate({ ...req.body, id: reportId });
            if (error) {
                if (req.file) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                }
                return next(createError(400, error.details[0].message));
            }

            const existingReport = await ReportService.getReportById(reportId);
            if (!existingReport) {
                return next(createError(404, 'Report not found!'));
            }

            let imagePath = existingReport.image;
            if (req.file) {
                if (existingReport.image) {
                    fs.unlink(existingReport.image, (err) => {
                        if (err) console.error('Error deleting old image:', err);
                    });
                }
                imagePath = req.file.path;
            }

            const updatedData = {
                ...req.body,
                image: imagePath,
                updatedAt: new Date(),
            };

            const updatedReport = await ReportService.updateReport(reportId, updatedData);

            return res.status(200).json({
                status: 'success',
                message: 'Report updated successfully!',
                data: updatedReport,
            });

        } catch (error) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            next(error);
        }
    }

    static async updateTypeReport(req, res, next) {
        try {
            const reportId = req.params.id;

            const { error } = updateTypeReportSchema.validate({ id: reportId, ...req.body });
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const existingReport = await ReportService.getReportById(reportId);
            if (!existingReport) {
                return next(createError(404, 'Report not found!'));
            }

            const updatedData = {
                type_report: req.body.type_report,
                updatedAt: new Date(),
            };

            const updatedReport = await ReportService.updateReport(reportId, updatedData);

            return res.status(200).json({
                status: 'success',
                message: 'Report type updated successfully!',
                data: updatedReport,
            });

        } catch (error) {
            next(error);
        }
    }

    static async deleteReport(req, res, next) {
        try {
            const reportId = req.params.id;

            const { error } = deleteReportSchema.validate({ id: reportId });
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const existingReport = await ReportService.getReportById(reportId);
            if (!existingReport) {
                return next(createError(404, 'Report not found!'));
            }

            if (existingReport.image) {
                fs.unlink(existingReport.image, (err) => {
                    if (err) console.error('Error deleting image:', err);
                });
            }

            await ReportService.deleteReport(reportId);

            return res.status(200).json({
                status: 'success',
                message: `Report deleted successfully!`,
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReportsController;

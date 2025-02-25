const createError = require('http-errors');
const { createReportSchema, getReportByIdSchema } = require('../validations/reportValidations');
const ReportService = require('../services/reportServices');
const UsersServices = require('../services/usersServices');

class ReportsController {
    static async createReport(req, res, next) {
        try {
            const { error } = createReportSchema.validate(req.body);
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const userExists = await UsersServices.checkUserExists(req.body.userId);
            if (!userExists) {
                return next(createError(404, 'User is not registered in our database!'));
            }

            // laporan valid
            // const allowedTypes = ['Jalan Rusak', 'Bencana', 'Rumah Retak']; 
            // if (!allowedTypes.includes(req.body.type_report)) {
            //     return next(createError(422, `Invalid Type Report, Allowed values: ${allowedTypes.join(', ')}`));
            // }

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
            next(error); // next untuk meneruskan error ke middleware errorHandler
        }
    }

    static async getAllReports(req, res, next) {
        try {
            const reports = await ReportService.getAllReports();

            const baseUrl = `${req.protocol}://${req.get('host')}/`;

            // const reportsWithImageUrls = reports.map(report => ({
            //     ...report,
            //     image: report.image ? `${baseUrl}${report.image.replace(/\\/g, '/')}` : null
            // }));

            const reportsWithImageUrls = reports.map(report => {
                const reportData = report.toJSON();
                return {
                    id: reportData.id,
                    userId: reportData.userId,
                    image: reportData.image ? `${baseUrl}${reportData.image.replace(/\\/g, '/')}` : null,
                    type_report: reportData.type_report,
                    description: reportData.description,
                    location: reportData.location,
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

    /**
     * Mendapatkan laporan berdasarkan ID
     */
    static async getReportById(req, res, next) {
        try {
            const params = req.params.id;

            const { error } = getReportByIdSchema.validate({ id: params });
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const report = await ReportService.getReportById(params);
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
                location: reportData.location,
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

            const params = req.params.userId;

            const { error } = getReportByIdSchema.validate({ id: params });
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const response = await ReportService.getReportsByUserId(params);
            if (!response || response.length === 0) {
                return next(createError(404, `No reports found for this user with id  = ${{ params }}`));
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
                    location: reportData.location,
                    createdAt: reportData.createdAt,
                    updatedAt: reportData.updatedAt,
                };
            });

            const responseData = {
                "id": response.id,
                "name": response.name,
                "email": response.email,
                "password": response.password,
                "refreshToken": response.refreshToken,
                "roleId": response.roleId,
                "createdAt": response.createdAt,
                "updatedAt": response.updatedAt,
                "reports" : reportsWithImageUrls
            }

            return res.status(200).json({
                status: 'success',
                data: responseData
            });

        } catch (error) {
            next(error);
        }
    }

    /**
     * Memperbarui laporan
     */
    static async updateReport(req, res, next) {
        try {
            const { error } = reportSchema.validate(req.body, { allowUnknown: true });
            if (error) throw createError(400, error.details[0].message);

            const updated = await ReportService.updateReport(req.params.id, req.body);
            if (!updated) throw createError(404, 'Report not found or no changes made');

            res.json({ message: 'Report successfully updated' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Menghapus laporan
     */
    static async deleteReport(req, res, next) {
        try {
            const deleted = await ReportService.deleteReport(req.params.id);
            if (!deleted) throw createError(404, 'Report not found or already deleted');

            res.json({ message: 'Report successfully deleted' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReportsController;

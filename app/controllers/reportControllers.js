const createError = require('http-errors');
const createReportSchema = require('../validations/reportValidations');
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
                return next(createError(404, 'User not found!'));
            }

            // laporan valid
            const allowedTypes = ['Jalan Rusak', 'Bencana', 'Rumah Retak']; 
            if (!allowedTypes.includes(req.body.type_report)) {
                return next(createError(422, `Invalid Type Report, Allowed values: ${allowedTypes.join(', ')}`));
            }

            const response = await ReportService.createReport(req.body);

            return res.status(201).json({
                status: 'success',
                message: 'Report created successfully!',
                data: response,
            });

        } catch (error) {
            next(error); // Gunakan next untuk meneruskan error ke middleware errorHandler
        }
    }

    /**
     * Mendapatkan semua laporan
     */
    static async getAllReports(req, res, next) {
        try {
            const reports = await ReportService.getAllReports(req.query);
            res.json(reports);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Mendapatkan laporan berdasarkan ID
     */
    static async getReportById(req, res, next) {
        try {
            const report = await ReportService.getReportById(req.params.id);
            if (!report) throw createError(404, 'Report not found');

            res.json(report);
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

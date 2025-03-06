const fs = require('fs');
const moment = require('moment');
const createError = require('http-errors');

const {
    createPostReportSchema,
    searchPostReportsSchema,
    updateStatusPostReportSchema,
    deletePostReportSchema,
} = require('../validations/postReportValidations');

const PostReportServices = require('../services/postReportServices');
const ReportServices = require('../services/reportServices');
const UsersServices = require('../services/usersServices');
const NotificationServices = require('../services/notificationServices');

class PostReportsController {
    static async createPostReport(req, res, next) {
        try {
            const { error } = createPostReportSchema.validate(req.body);
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const userExists = await UsersServices.checkUserExists(req.body.reportedBy);
            if (!userExists) {
                return next(createError(404, 'User is not registered in our database!'));
            }

            const postExists = await ReportServices.checkPostExists(req.body.postId);
            if (!postExists) {
                return next(createError(404, 'Posts is not found!'));
            }
            
            const postReportData = {
                ...req.body,
            };

            const response = await PostReportServices.createPostReport(postReportData);

            return res.status(201).json({
                status: 'success',
                message: 'Posts successfully reported!',
                data: response,
            });

        } catch (error) {
            next(error);
        }
    }

    static async getAllWithFilteredPostReports(req, res, next) {
        try {
            const { error, value } = searchPostReportsSchema.validate(req.query);
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const { postId, status, reason, reportedBy, startDate, endDate, sortBy = 'createdAt', order = 'DESC' } = value;

            const reports = await PostReportServices.getFilteredPostReports({
                postId,
                status,
                reason,
                reportedBy,
                startDate,
                endDate,
                sortBy,
                order
            });

            let filterMessage = [];
            if (status) filterMessage.push(`type '${status}'`);
            if (reason) filterMessage.push(`reason '${reason}'`);
            if (postId) filterMessage.push(`user ID '${postId}'`);
            if (reportedBy) filterMessage.push(`user ID who reported'${reportedBy}'`);
            if (startDate) filterMessage.push(`from '${startDate}'`);
            if (endDate) filterMessage.push(`until '${endDate}'`);

            const searchCriteria = filterMessage.length > 0 ? filterMessage.join(', ') : 'no filters applied';

            if (reports.length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: `No reports found with ${searchCriteria}.`,
                    data: [],
                });
            }

            return res.status(200).json({
                status: 'success',
                data: reports
            });

        } catch (error) {
            next(error);
        }
    }

    static async updateStatusPostReport(req, res, next) {
        try {
            const postReportId = req.params.id;

            const { error } = updateStatusPostReportSchema.validate({ id: postReportId, ...req.body });
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const existingPostReport = await PostReportServices.getPostReportById(postReportId);
            if (!existingPostReport) {
                return next(createError(404, 'Report not found!'));
            }

            const updatedAt = moment().tz("Asia/Jakarta").format();

            const updatedData = {
                status: req.body.status,
                updatedAt,
            };

            const updatedReport = await PostReportServices.updatePostReport(postReportId, updatedData);

            await NotificationServices.createNotification({
                userId: existingPostReport.reportedBy,
                postReportId,
                message: `Your report has been updated to '${req.body.status}'.`,
            });    

            return res.status(200).json({
                status: 'success',
                message: 'Status posts reports updated successfully!',
                data: updatedReport,
            });

        } catch (error) {
            next(error);
        }
    }

    static async deletePostReport(req, res, next) {
        try {
            const reportId = req.params.id;

            const { error } = deletePostReportSchema.validate({ id: reportId });
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const existingReport = await PostReportServices.getPostReportById(reportId);
            if (!existingReport) {
                return next(createError(404, 'Report not found!'));
            }

            await PostReportServices.deletePostReport(reportId);

            return res.status(200).json({
                status: 'success',
                message: `Posts Report deleted successfully!`,
            });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = PostReportsController;

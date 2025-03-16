const createError = require('http-errors');
const NotificationService = require('../services/notificationServices');
const UsersServices = require('../services/usersServices');

const {
    getNotificationsByUserIdSchema,
    getDetailNotificationSchema
} = require('../validations/notificationValidations');

class NotificationControllers {
    static async getNotificationsByUserId(req, res, next) {
        try {
            const { userId } = req.query;

            const { error } = getNotificationsByUserIdSchema.validate({ id: userId });

            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const userExists = await UsersServices.checkUserExists(userId);
            if (!userExists) {
                return next(createError(404, 'User is not registered in our database!'));
            }

            const notifications = await NotificationService.getNotificationsByUser(userId);

            // const parsing = notifications.map(res => {
            //     const val = res.toJSON();
            //     return {
            //         // ...val,
            //         'message': val.message,
            //     }
            // });

            // for (let i = 0; i < notifications.length; i++) {
            //     console.log(parsing[i]);
            // }

            // const parsing = notifications.map(res => ({
            //     message: res.toJSON().message,
            // }))

            // console.log(parsing);

            if (notifications == 0) {
                return next(createError(400, `User with id '${userId}' dont have notification`));
            }

            return res.status(200).json({
                status: 'success',
                data: notifications,
            });

        } catch (error) {
            next(error);
        }
    }

    static async getDetailNotification(req, res, next) {
        try {
            const notificationId = req.params.id;

            const { error } = getDetailNotificationSchema.validate({ id: notificationId });

            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const existingNotification = await NotificationService.getNotificationsById(notificationId);

            if (!existingNotification) {
                return next(createError(400, `Notification with id '${notificationId}' not found!`));
            }

            const getDetailNotification = await NotificationService.getDetailNotificationsById(notificationId);

            if (getDetailNotification == null) {
                return next(createError(400, "No changes applied on database!"));
            }

            return res.status(200).json({
                status: 'success',
                data: getDetailNotification,
            });

        } catch (error) {
            next(error);
        }
    }

    static async markAsRead(req, res, next) {
        try {
            const notificationId = req.params.id;

            const { error } = getDetailNotificationSchema.validate({ id: notificationId });

            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const existingNotification = await NotificationService.getNotificationsById(notificationId);

            if (!existingNotification) {
                return next(createError(400, `Notification with id '${notificationId}' not found!`));
            }

            const markAsReadNotification = await NotificationService.updateNotification(notificationId, { 'isRead': true });

            if (markAsReadNotification[0] == 0) {
                return next(createError(400, "No changes applied on database!"));
            }

            return res.status(200).json({
                status: 'success',
                message: 'Notification marked as read',
                data: markAsReadNotification,
            });

        } catch (error) {
            next(error);
        }
    }

    static async viewStatus(req, res, next) {
        try {
            const notificationId = req.params.id;

            const { error } = getDetailNotificationSchema.validate({ id: notificationId });

            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const existingNotification = await NotificationService.getNotificationsById(notificationId);

            if (!existingNotification) {
                return next(createError(400, `Notification with id '${notificationId}' not found!`));
            }

            const viewStatusNotification = await NotificationService.getNotificationsById(notificationId);

            if (viewStatusNotification == null) {
                return next(createError(400, "No changes applied on database!"));
            }

            const splitMessageStatus = viewStatusNotification.message.split("'");

            const splitResult = splitMessageStatus[1].toString();

            // console.log(splitResult);

            return res.status(200).json({
                status: 'success',
                data: splitResult,
            });

        } catch (error) {
            next(error);
        }
    }

    static async deleteNotificationById(req, res, next) {
        try {
            const notificationId = req.params.id;

            const { error } = getDetailNotificationSchema.validate({ id: notificationId });

            if (error) {
                next(createError(400, error.details[0].message));
            }

            const existingNotification = await NotificationService.getNotificationsById(notificationId);

            if (!existingNotification) {
                return next(createError(400, `Notification with id '${notificationId}' not found!`));
            }

            await NotificationService.deleteNotificationById(notificationId);

            return res.status(200).json({
                status: 'success',
                message: 'Notification deleted successfully!'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = NotificationControllers;

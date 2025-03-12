const createError = require('http-errors');
const NotificationService = require('../services/notificationServices');

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

            const { error } = getDetailNotificationSchema.validate({id: notificationId });

            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const getDetailNotification = await NotificationService.getDetailNotificationsById(notificationId);

            if (getDetailNotification == null) {
                return next(createError(400, "Notification ID is incorrect!"));
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
            if (!notificationId) {
                return res.status(400).json({ message: 'Notification ID is required!' });
            }

            const markAsReadNotification = await NotificationService.updateNotification(notificationId, { 'isRead': true });

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
            if (!notificationId) {
                return res.status(400).json({ message: 'Notification ID is required!' });
            }
            const viewStatusNotification = await NotificationService.getNotificationsById(notificationId);

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

}

module.exports = NotificationControllers;

const NotificationService = require('../services/notificationServices');

class NotificationControllers {
    static async getNotifications(req, res, next) {
        try {
            const { userId } = req.query;
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const notifications = await NotificationService.getNotificationsByUser(userId);

            return res.status(200).json({
                status: 'success',
                data: notifications,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NotificationControllers;

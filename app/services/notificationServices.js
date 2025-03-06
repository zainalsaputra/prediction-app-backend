const { Notifications } = require('../models');

class NotificationServices {
    static async createNotification(data) {
        return await Notifications.create(data);
    }

    static async getNotificationsByUser(userId) {
        return await Notifications.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
    }

    static async markAsRead(notificationId) {
        return await Notifications.update({ isRead: true }, { where: { id: notificationId } });
    }
}

module.exports = NotificationServices;

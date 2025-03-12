// const { Notifications, Users, PostReports } = require('../models');
const db = require('../models');
const { Notifications, Users, PostReports } = db;

class NotificationServices {
    static async createNotification(data) {
        return await Notifications.create(data);
    }

    static async getNotificationsByUser(userId) {
        return await Notifications.findAll(
            {
                where: { userId },
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'message','isRead', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Users,
                        as: 'user',
                        attributes: ['id', 'name', 'createdAt', 'updatedAt']
                    },
                    {
                        model: PostReports,
                        as: 'postReports',
                        // attributes: ['id', 'postId', 'reportedBy', 'reason', 'status', 'createdAt', 'updatedAt']
                    }
                ]
            }
        );
    }

    static async getNotificationsById(id) {
        return await Notifications.findOne({ where: { id } });
    }

    static async getDetailNotificationsById(id) {
        return await Notifications.findOne({
            where: { id },
            attributes: ['id', 'message','isRead', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'name', 'createdAt', 'updatedAt']
                },
                {
                    model: PostReports,
                    as: 'postReports',
                    attributes: ['id', 'postId', 'reportedBy', 'reason', 'status', 'createdAt', 'updatedAt']
                }
            ]
        });
    }


    static async updateNotification(id, data) {
        return await Notifications.update(data,
            {
                where: { id },
                returning: true,
            }
        );
    }
}

module.exports = NotificationServices;

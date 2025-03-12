const express = require('express');
const NotificationControllers = require('../controllers/notificationControllers');

const router = express.Router();

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get notifications by user ID (Query)
 *     description: Retrieve all notifications for a specific user by providing userId as a query parameter.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: User ID to fetch notifications for
 *     responses:
 *       200:
 *         description: Successfully retrieved notifications
 *       400:
 *         description: Bad request (invalid user ID format)
 *       404:
 *         description: No notifications found for the given user ID
 *       500:
 *         description: Internal server error
 */
router.get('/', NotificationControllers.getNotificationsByUserId);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get notification details by ID
 *     description: Retrieve the details of a specific notification by its ID.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the notification
 *     responses:
 *       200:
 *         description: Successfully retrieved notification details
 *       400:
 *         description: Invalid notification ID format
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', NotificationControllers.getDetailNotification);

/**
 * @swagger
 * /notifications/{id}/read:
 *   get:
 *     summary: Mark a notification as read
 *     description: Mark a specific notification as read using its ID.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the notification to mark as read
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *       400:
 *         description: Invalid notification ID format
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/read', NotificationControllers.markAsRead);

/**
 * @swagger
 * /notifications/{id}/status:
 *   get:
 *     summary: View notification status
 *     description: Check the status (read/unread) of a specific notification.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the notification to check status
 *     responses:
 *       200:
 *         description: Successfully retrieved notification status
 *       400:
 *         description: Invalid notification ID format
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/status', NotificationControllers.viewStatus);

module.exports = router;

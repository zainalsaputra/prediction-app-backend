const express = require('express');
const NotificationControllers = require('../controllers/notificationControllers');

const router = express.Router();

router.get('/', NotificationControllers.getNotificationsByUserId);

router.get('/:id', NotificationControllers.getDetailNotification);

router.get('/:id/read', NotificationControllers.markAsRead);

router.get('/:id/status', NotificationControllers.viewStatus);

module.exports = router;
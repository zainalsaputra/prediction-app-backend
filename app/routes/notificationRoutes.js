const express = require('express');
const NotificationControllers = require('../controllers/notificationControllers');

const router = express.Router();

router.get('/', NotificationControllers.getNotifications);

module.exports = router;
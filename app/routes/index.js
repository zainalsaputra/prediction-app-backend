const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const predictRoutes = require('./predictRoutes');
const reportRoutes = require('./reportRoutes');
const postReportRoutes = require('./postReportRoutes');
const notificationRoutes = require('./notificationRoutes');
const statisticRoutes = require('./statisticRoutes');
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');

router.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: `View documentation API on ${req.get('host')}/docs`,
  });
});

router.use('/auth', authRoutes);

router.use('/predict', authMiddleware, roleMiddleware(['admin']), predictRoutes);

router.use('/reports', authMiddleware, roleMiddleware(['admin', 'user']), reportRoutes);

router.use('/post/reports', authMiddleware, roleMiddleware(['admin', 'user']), postReportRoutes);

router.use('/notifications', authMiddleware, roleMiddleware(['admin', 'user']), notificationRoutes);

router.use('/statistics', authMiddleware, roleMiddleware(['admin', 'user']), statisticRoutes);

router.use('/users', authMiddleware, roleMiddleware(['admin']), usersRoutes);

module.exports = router;

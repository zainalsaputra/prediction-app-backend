const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const predictRoutes = require('./predictRoutes');
const reportRoutes = require('./reportRoutes');
const postReportRoutes = require('./postReportRoutes');
const notificationRoutes = require('./notificationRoutes');
const statisticRoutes = require('./statisticRoutes');
const authenticationRoutes = require('./authenticationRoutes');

router.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: `View documentation API on ${req.get('host')}/docs`,
  });
});

router.use('/auth', authenticationRoutes);
router.use('/predict', predictRoutes);
router.use('/reports', authMiddleware, roleMiddleware(['user']), reportRoutes);
router.use('/post/reports', authMiddleware, roleMiddleware(['user']), postReportRoutes);
router.use('/notifications', authMiddleware, roleMiddleware(['user']), notificationRoutes);
router.use('/statistics', authMiddleware, roleMiddleware(['user']), statisticRoutes);

module.exports = router;

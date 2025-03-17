const express = require('express');

const router = express.Router();

const predictRoutes = require('./predictRoutes');
const reportRoutes = require('./reportRoutes');
const postReportRoutes = require('./postReportRoutes');
const notificationRoutes = require('./notificationRoutes');
const statisticRoutes = require('./statisticRoutes');

router.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: `View documentation API on ${req.get('host')}/docs`,
  });
});

router.use('/predict', predictRoutes);
router.use('/reports', reportRoutes);
router.use('/post/reports', postReportRoutes);
router.use('/notifications', notificationRoutes);
router.use('/statistics', statisticRoutes);

module.exports = router;

const express = require('express');
const statisticControllers = require('../controllers/statisticControllers');

const router = express.Router();

router.get('/reports',statisticControllers.getWithFilteredStatisticsReports);

module.exports = router;

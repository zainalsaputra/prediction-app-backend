const express = require('express');
const reportControllers = require('../controllers/reportControllers');

const router = express.Router();

router.post('/', reportControllers.createReport);

module.exports = router;

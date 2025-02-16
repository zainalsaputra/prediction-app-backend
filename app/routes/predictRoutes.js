const express = require('express');
const predictUploader = require('../middleware/predictUploader');
const predictControllers = require('../controllers/predictControllers');

const router = express.Router();

router.get('/', predictControllers.getResponseAPI);
router.post('/', predictUploader.single("image"), predictControllers.createPredict);

module.exports = router;

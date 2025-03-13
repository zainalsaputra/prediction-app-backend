const express = require('express');
const PostReportsController = require('../controllers/postReportControllers');
const router = express.Router();

router.post('/', PostReportsController.createPostReport);

router.get('/', PostReportsController.getAllWithFilteredPostReports);

router.get('/:id/status', PostReportsController. getStatusPostReport);

router.patch('/:id/status', PostReportsController. updateStatusPostReport);

router.delete('/:id', PostReportsController.deletePostReport);

module.exports = router;
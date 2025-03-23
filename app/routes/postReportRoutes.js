const express = require('express');
const PostReportsController = require('../controllers/postReportControllers');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /post/reports:
 *   post:
 *     summary: Create a new post report
 *     description: Report a post by providing post ID and reason.
 *     tags:
 *       - Post Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               reportedBy:
 *                 type: string
 *                 format: uuid
 *                 example: "98fa12bc-345d-67ef-8901-23456789abcd"
 *               reason:
 *                 type: string
 *                 example: "Inappropriate content"
 *     responses:
 *       201:
 *         description: Post report created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.post('/', roleMiddleware(['user','admin']), PostReportsController.createPostReport);

/**
 * @swagger
 * /post/reports:
 *   get:
 *     summary: Get all post reports with filters
 *     description: Retrieve all post reports, optionally filtered by status, user, or date.
 *     tags:
 *       - Post Reports
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Reviewed, Resolved]
 *         description: Filter reports by status
 *       - in: query
 *         name: reportedBy
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter reports by user who reported them
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering reports (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering reports (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered post reports
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/', roleMiddleware(['user','admin']), PostReportsController.getAllWithFilteredPostReports);

/**
 * @swagger
 * /post/reports/{id}/status:
 *   get:
 *     summary: Get post report status
 *     description: Retrieve the status of a specific post report.
 *     tags:
 *       - Post Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the post report
 *     responses:
 *       200:
 *         description: Successfully retrieved post report status
 *       404:
 *         description: Post report not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/status', roleMiddleware(['user','admin']), PostReportsController.getStatusPostReport);

/**
 * @swagger
 * /post/reports/{id}/status:
 *   patch:
 *     summary: Update post report status
 *     description: Change the status of a post report (Pending, Reviewed, Resolved).
 *     tags:
 *       - Post Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the post report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Reviewed, Resolved]
 *                 example: "Reviewed"
 *     responses:
 *       200:
 *         description: Post report status updated successfully
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Post report not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/status', roleMiddleware(['admin']), PostReportsController.updateStatusPostReport);

/**
 * @swagger
 * /post/reports/{id}:
 *   delete:
 *     summary: Delete a post report
 *     description: Remove a post report from the system.
 *     tags:
 *       - Post Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the post report to delete
 *     responses:
 *       200:
 *         description: Post report deleted successfully
 *       404:
 *         description: Post report not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', roleMiddleware(['admin']), PostReportsController.deletePostReport);

module.exports = router;

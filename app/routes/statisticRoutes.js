const express = require('express');
const statisticControllers = require('../controllers/statisticControllers');

const router = express.Router();

/**
 * @swagger
 * /statistics/reports:
 *   get:
 *     summary: Get statistics of reports by location filters
 *     description: Retrieve report statistics based on province, district, subdistrict, and village.
 *     tags:
 *       - Statistics
 *     parameters:
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: Filter reports by province
 *         example: "Jawa Timur"
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *         description: Filter reports by district
 *         example: "Surabaya"
 *       - in: query
 *         name: subdistrict
 *         schema:
 *           type: string
 *         description: Filter reports by subdistrict
 *         example: "Gempol"
 *       - in: query
 *         name: village
 *         schema:
 *           type: string
 *         description: Filter reports by village
 *         example: "Bandulan"
 *     responses:
 *       200:
 *         description: Successfully retrieved report statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   example:
 *                     "Jalan Rusak": 120
 *                     "Jembatan Rusak": 30
 *                     "Sampah Berserakan": 20
 *                     "Bangunan Rusak": 8
 *                     "Bangunan Roboh": 1
 *       400:
 *         description: Bad request (invalid query parameters)
 *       404:
 *         description: No reports found for the given location filters
 *       500:
 *         description: Internal server error
 */
router.get('/reports',statisticControllers.getWithFilteredStatisticsReports);

module.exports = router;

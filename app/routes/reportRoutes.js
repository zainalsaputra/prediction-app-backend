const express = require('express');
const reportControllers = require('../controllers/reportControllers');
const imageUploader = require('../middleware/imageUploader');
const router = express.Router();

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Create a new report
 *     description: Endpoint to create a new report by uploading an image.
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               type_report:
 *                 type: string
 *                 example: "Jalan Rusak"
 *               description:
 *                 type: string
 *                 example: "Jalan utama mengalami kerusakan parah akibat hujan deras."
 *               region:
 *                 type: string
 *                 example: "Jakarta Selatan"
 *               longitude:
 *                 type: number
 *                 format: float
 *                 example: 106.827153
 *               latitude:
 *                 type: number
 *                 format: float
 *                 example: -6.175110
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: b077733d-e727-4cd5-8a6c-88f98f59d7b2
 *     responses:
 *       201:
 *         description: Report successfully created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', (req, res, next) => {
    imageUploader.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, reportControllers.createReport);

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Retrieve all reports
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: Successfully retrieved reports
 *       500:
 *         description: Internal server error
 */
router.get('/', reportControllers.getAllReports);

/**
 * @swagger
 * /reports/{id}:
 *   get:
 *     summary: Get a report by ID
 *     tags:
 *       - Reports
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Report data found
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', reportControllers.getReportById);

/**
 * @swagger
 * /reports/user/{userId}:
 *   get:
 *     summary: Get all reports by a specific user ID
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved reports
 *       404:
 *         description: No reports found for this user
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', reportControllers.getReportsByUserId);

/**
 * @swagger
 * /reports/{id}:
 *   put:
 *     summary: Update an existing report
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type_report:
 *                 type: string
 *                 example: "Jalan Rusak"
 *               description:
 *                 type: string
 *                 example: "Jalan utama mengalami kerusakan parah akibat hujan deras."
 *               region:
 *                 type: string
 *                 example: "Jakarta Selatan"
 *               longitude:
 *                 type: number
 *                 format: float
 *                 example: 106.827153
 *               latitude:
 *                 type: number
 *                 format: float
 *                 example: -6.175110
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', (req, res, next) => {
    imageUploader.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, reportControllers.updateReport);

/**
 * @swagger
 * /reports/{id}/type-report:
 *   patch:
 *     summary: Update only the type of a report
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type_report:
 *                 type: string
 *                 example: "Bencana"
 *     responses:
 *       200:
 *         description: Report type updated successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/type-report', reportControllers.updateTypeReport);

/**
 * @swagger
 * /reports/{id}:
 *   delete:
 *     summary: Delete a report
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', reportControllers.deleteReport);

module.exports = router;

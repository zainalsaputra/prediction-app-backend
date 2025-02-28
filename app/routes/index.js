const express = require('express');

const router = express.Router();

// const predictRoutes = require('./predictRoutes');
// const reportRoutes = require('./reportRoutes');

router.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: `View documentation API on ${req.get('host')}/docs`,
  });
});

// router.use('/predict', predictRoutes);
// router.use('/reports', reportRoutes);

const predictControllers = require('../controllers/predictControllers');
const reportControllers = require('../controllers/reportControllers');


const predictUploader = require('../middleware/predictUploader');

/**
 * @swagger
 * /predict:
 *   post:
 *     summary: Unggah gambar untuk prediksi
 *     description: Endpoint untuk mengunggah file gambar dan mendapatkan hasil prediksi.
 *     tags:
 *       - Prediction
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
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan prediksi
 *       400:
 *         description: Format file tidak valid atau file tidak diunggah
 *       500:
 *         description: Kesalahan server
 */
router.post('/predict/', (req, res, next) => {
    predictUploader.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, predictControllers.createPredict);


const imageUploader = require('../middleware/imageUploader');

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
router.post('/reports/', (req, res, next) => {
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
 *     summary: Get all report or Search reports with filters
 *     description: Retrieve reports based on type, region, user ID, and date range.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: query
 *         name: type_report
 *         schema:
 *           type: string
 *         description: 'Filter by type of report (e.g., Jalan Rusak, Bencana, Rumah Retak)'
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: 'Filter by region (e.g., Jakarta Selatan)'
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 'Filter by user ID'
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: 'Filter reports starting from this date (YYYY-MM-DD)'
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: 'Filter reports until this date (YYYY-MM-DD)'
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, type_report, region]
 *           default: createdAt  # ✅ Default sorting
 *         description: 'Sort results by field'
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC  # ✅ Default order
 *         description: 'Sort order (ASC or DESC)'
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "3339b4b2-26ea-4039-bcd5-9f8b170ed6c8"
 *                       userId:
 *                         type: string
 *                         example: "b077733d-e727-4cd5-8a6c-88f98f59d7b2"
 *                       type_report:
 *                         type: string
 *                         example: Jalan Rusak
 *                       description:
 *                         type: string
 *                         example: Jalan berlubang parah di Jakarta Selatan.
 *                       region:
 *                         type: string
 *                         example: Jakarta Selatan
 *                       longitude:
 *                         type: number
 *                         format: float
 *                         example: 106.827153
 *                       latitude:
 *                         type: number
 *                         format: float
 *                         example: -6.175110
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-02T12:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-05T15:30:00.000Z"
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/reports/', reportControllers.getAllWithFilteredReports);


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
router.get('/reports/user/:userId', reportControllers.getReportsByUserId);

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
router.put('/reports/:id', (req, res, next) => {
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
router.patch('/reports/:id/type-report', reportControllers.updateTypeReport);

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
router.delete('/reports/:id', reportControllers.deleteReport);


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
router.get('/reports/:id', reportControllers.getReportById);

module.exports = router;

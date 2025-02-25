const express = require('express');
const reportControllers = require('../controllers/reportControllers');
const imageUploader = require('../middleware/imageUploader');
const ReportsController = require('../controllers/reportControllers');

const router = express.Router();

/**
 * @swagger
 * /report:
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
 *                 description: Uploaded image file
 *               type_report:
 *                 type: string
 *                 description: Type of report
 *                 example: "Accident"
 *               description:
 *                 type: string
 *                 description: Report description
 *                 example: "An accident occurred on the main road at 10:00 AM"
 *               location:
 *                 type: string
 *                 description: Incident location
 *                 example: "Jl. Merdeka No.10, Jakarta"
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user creating the report
 *                 example: "b077733d-e727-4cd5-8a6c-88f98f59d7b2"
 *     responses:
 *       201:
 *         description: Report successfully created
 *       400:
 *         description: Bad request (missing or incorrect data format)
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
 * /report:
 *   get:
 *     summary: Retrieve all reports
 *     description: Fetch a list of all reports along with uploaded images.
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
 * /report/{id}:
 *   get:
 *     summary: Get a report by ID
 *     description: Fetch a single report by its ID.
 *     tags:
 *       - Reports
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to retrieve
 *     responses:
 *       200:
 *         description: Report data found
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "3339b4b2-26ea-4039-bcd5-9f8b170ed6c8"
 *                     userId:
 *                       type: string
 *                       example: "b077733d-e727-4cd5-8a6c-88f98f59d7b2"
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: "http://localhost:3000/uploads/image-1740423764312.jpg"
 *                     type_report:
 *                       type: string
 *                       example: "Disaster"
 *                     description:
 *                       type: string
 *                       example: "An accident occurred on the main road at 10:00 AM"
 *                     location:
 *                       type: string
 *                       example: "Jl. Merdeka No.10, Jakarta"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-24T19:02:44.353Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-24T19:02:44.353Z"
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', reportControllers.getReportById);

/**
 * @swagger
 * /report/user/{userId}:
 *   get:
 *     summary: Get all reports by a specific user ID
 *     description: Fetch all reports created by a specific user.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: id
 *         description: The ID of this user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved reports
 *       400:
 *         description: Invalid User ID
 *       404:
 *         description: No reports found for this user
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', reportControllers.getReportsByUserId);

/**
 * @swagger
 * /report/{id}:
 *   put:
 *     summary: Update an existing report (including image)
 *     description: Update a report's details including type, description, location, and optional image upload.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to update
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
 *               location:
 *                 type: string
 *                 example: "Jl. Merdeka No. 123, Jakarta"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file to update the report
 *     responses:
 *       200:
 *         description: Report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Report updated successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "3339b4b2-26ea-4039-bcd5-9f8b170ed6c8"
 *                     type_report:
 *                       type: string
 *                       example: "Jalan Rusak"
 *                     description:
 *                       type: string
 *                       example: "Jalan utama mengalami kerusakan parah akibat hujan deras."
 *                     location:
 *                       type: string
 *                       example: "Jl. Merdeka No. 123, Jakarta"
 *                     image:
 *                       type: string
 *                       example: "uploads/report-image-12345.jpg"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid request payload
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
}, ReportsController.updateReport);

/**
 * @swagger
 * /report/{id}/type-report:
 *   patch:
 *     summary: Update the type of a report
 *     description: Update only the `type_report` field of an existing report.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to update
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
 *                 description: New type of the report
 *     responses:
 *       200:
 *         description: Report type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Report type updated successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "3339b4b2-26ea-4039-bcd5-9f8b170ed6c8"
 *                     type_report:
 *                       type: string
 *                       example: "Bencana"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid request payload
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

router.patch('/:id/type-report', ReportsController.updateTypeReport);

/**
 * @swagger
 * /report/{id}:
 *   delete:
 *     summary: Delete a report
 *     description: Remove an existing report by ID.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to delete
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Report deleted successfully!"
 *       400:
 *         description: Invalid request payload
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', ReportsController.deleteReport);

module.exports = router;

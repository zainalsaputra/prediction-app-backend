const express = require('express');
const reportControllers = require('../controllers/reportControllers');
const imageUploader = require('../middleware/imageUploader');

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

module.exports = router;

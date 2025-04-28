const express = require('express');

const AuthController = require('../controllers/authControllers');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users with location [admin]
 *     description: Retrieve a list of all registered users.
 *     tags:
 *       - Administrators
 *     responses:
 *       200:
 *         description: Successfully retrieved user list
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
 *                         format: uuid
 *                         example: "b077733d-e727-4cd5-8a6c-88f98f59d7b2"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       role:
 *                         type: string
 *                         example: "admin"
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       500:
 *         description: Internal server error
 */
router.get('/', AuthController.getAllUsers);

module.exports = router;
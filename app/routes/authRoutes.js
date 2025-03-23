const express = require('express');

const { loginLimiter } = require('../middleware/rateLimit');

const AuthController = require('../controllers/authControllers');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user with location
 *     description: Register a new user with their location details.
 *     tags:
 *       - Authentications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 description: User's password (must be hashed)
 *                 example: "securepassword123"
 *               province:
 *                 type: string
 *                 description: User's province
 *                 example: "Jawa Timur"
 *               district:
 *                 type: string
 *                 description: User's district
 *                 example: "Kota Malang"
 *               subdistrict:
 *                 type: string
 *                 description: User's subdistrict
 *                 example: "Sukun"
 *               village:
 *                 type: string
 *                 description: User's village
 *                 example: "Bandulan"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (missing or invalid data)
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and receive an access token.
 *     tags:
 *       - Authentications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Login successful, returns access token
 *       401:
 *         description: Unauthorized (invalid email or password)
 */
router.post('/login', loginLimiter, AuthController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh Access Token
 *     description: Get a new access token using a refresh token.
 *     tags:
 *       - Authentications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token issued during login
 *                 example: "eyJhbGciOiJIUzI1..."
 *     responses:
 *       200:
 *         description: Successfully refreshed access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new access token
 *                   example: "eyJhbGciOiJIUzI1..."
 *       400:
 *         description: Bad request (missing or invalid refresh token)
 *       401:
 *         description: Unauthorized (invalid or expired refresh token)
 */
router.post('/refresh', AuthController.refreshToken);

module.exports = router;

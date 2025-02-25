const express = require('express');
const imageUploader = require('../middleware/imageUploader');
const predictControllers = require('../controllers/predictControllers');

const router = express.Router();

/**
 * @swagger
 * /predict:
 *   get:
 *     summary: Cek respons API
 *     description: Mengembalikan respons default dari API.
 *     tags:
 *       - Prediction
 *     responses:
 *       200:
 *         description: API berjalan dengan baik
 *       500:
 *         description: Kesalahan server
 */
router.get('/', predictControllers.getResponseAPI);

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
router.post('/', (req, res, next) => {
    imageUploader.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, predictControllers.createPredict);


module.exports = router;

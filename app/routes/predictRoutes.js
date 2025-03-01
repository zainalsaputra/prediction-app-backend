const express = require('express');
const predictControllers = require('../controllers/predictControllers');

const router = express.Router();

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
router.post('/', (req, res, next) => {
    predictUploader.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, predictControllers.createPredict);


module.exports = router;

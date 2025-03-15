const axios = require("axios");
const FormData = require("form-data");
// const fs = require("fs");
const cloudinary = require('../config/cloudinary');
require('dotenv').config();

class PredictControllers {

    // static getResponseAPI = async (req, res) => {
    //     try {
    //         res.status(200).json({
    //             status: 'success',
    //             message: 'This response from backend API:D',
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Internal server error" });
    //     }
    // }

    // static createPredict = async (req, res, next) => {
    //     try {
    //         if (!req.file) {
    //             return res.status(400).json({ error: "No file uploaded" });
    //         }

    //         const formData = new FormData();
    //         formData.append("file", fs.createReadStream(req.file.path));

    //         const ai_url = process.env.AI_URL;
    //         if (!ai_url) {
    //             return res.status(500).json({ error: "AI_URL is not defined in environment variables" });
    //         }

    //         const endpoint = 'predict';
    //         const response = await axios.post(`${ai_url}/${endpoint}`, formData, {
    //             headers: {
    //                 ...formData.getHeaders(),
    //             },
    //         });

    //         // delete image after predict
    //         // fs.unlink(req.file.path, (err) => {
    //         //     if (err) console.error("Error deleting file:", err);
    //         // });

    //         res.status(200).json({
    //             status: 'success',
    //             prediction: response.data.prediction,
    //             message: "Prediksi berhasil!"
    //         });

    //     } catch (error) {
    //         // console.error("Error in createPredict:", error.response ? error.response.data : error.message);
    //         // res.status(error.response?.status || 500).json({
    //         //     error: error.response ? error.response.data : "Internal server error"
    //         // });
    //         next(error)
    //     }
    // }

    static createPredict = async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const ai_url = process.env.AI_URL;
            if (!ai_url) {
                return res.status(500).json({ error: "AI_URL is not defined in environment variables" });
            }

            const formData = new FormData();
            formData.append("file", req.file.buffer, { filename: req.file.originalname });

            const response = await axios.post(`${ai_url}/predict`, formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            const result = await cloudinary.uploader.upload_stream(
                { folder: "predictions", public_id: `image-${Date.now()}` },
                (error, cloudinaryResult) => {
                    if (error) {
                        return res.status(500).json({ error: "Failed to upload to Cloudinary" });
                    }

                    res.status(200).json({
                        status: 'success',
                        prediction: response.data.prediction,
                        imageUrl: cloudinaryResult.secure_url,
                        message: "Prediksi berhasil!"
                    });
                }
            ).end(req.file.buffer);

        } catch (error) {
            next(error);
        }
    };

}

module.exports = PredictControllers;
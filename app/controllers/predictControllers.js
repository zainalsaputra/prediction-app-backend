const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require('dotenv').config(); 

class PredictControllers {

    static getResponseAPI = async (req, res) => {
        try {
            res.status(201).json({
                status: 'success',
                message: 'This response from backend API:D',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static createPredict = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const formData = new FormData();
            formData.append("file", fs.createReadStream(req.file.path));

            const ai_link = process.env.AI_LINK;
            if (!ai_link) {
                return res.status(500).json({ error: "AI_LINK is not defined in environment variables" });
            }

            const endpoint = 'predict';
            const response = await axios.post(`${ai_link}/${endpoint}`, formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            res.json({
                status: true,
                prediction : response.data.prediction,
                message : "Prediksi berhasil!",
                image_path : response.data.image_path
            }).status(200);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = PredictControllers;
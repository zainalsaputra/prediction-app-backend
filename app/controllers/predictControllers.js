const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

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

            const response = await axios.post("http://localhost:5000/predict", formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = PredictControllers;
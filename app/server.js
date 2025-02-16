const express = require('express');
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.json());

const routes = require('./routes/index');

app.use(routes);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});
const upload = multer({ storage: storage });

app.post("/predict", upload.single("image"), async (req, res) => {
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
});

app.use((req, res, next) => {
  res.redirect('/not-found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

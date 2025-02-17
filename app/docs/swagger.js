const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Predict API",
            version: "1.0.0",
            description: "API untuk mengunggah file gambar dan mendapatkan prediksi dari model AI",
        },
        servers: [
            {
                url: process.env.BASE_URL || "https://prediction-app-backend.vercel.app",
            },
        ],
    },
    apis: [__dirname + "/../routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const setupSwagger = (app) => {
    // 1️⃣ **Tentukan path file statis Swagger UI**
    const swaggerDistPath = require("swagger-ui-dist").getAbsoluteFSPath();
    
    // 2️⃣ **Pastikan file statis dapat diakses**
    app.use("/swagger-ui", express.static(swaggerDistPath));

    // 3️⃣ **Gunakan Swagger UI dengan file statis yang benar**
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs, { customCssUrl: "/swagger-ui/swagger-ui.css" })
    );

    console.log("Swagger docs available at /docs");
};

module.exports = setupSwagger;

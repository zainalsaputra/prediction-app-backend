const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
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
                url: process.env.BASE_URL || "https://sec-prediction-app-backend.vercel.app",
            },
        ],
    },
    apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    // 🟢 Sajikan file statis Swagger UI
    const swaggerDistPath = require("swagger-ui-dist").getAbsoluteFSPath();
    app.use("/docs", express.static(swaggerDistPath));

    // 🟢 Sajikan Swagger UI dengan path yang benar
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs, {
            customCssUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
        })
    );

    console.log("Swagger docs available at /docs");
};

module.exports = setupSwagger;

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

const setupSwagger = (app) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    const swaggerDistPath = require("swagger-ui-dist").getAbsoluteFSPath();
    app.use("/docs", express.static(swaggerDistPath));

    console.log("Swagger docs available at /docs");
};

module.exports = setupSwagger;

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
require('dotenv').config();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Predict API",
            version: "1.0.0",
            description: "API untuk mengunggah file gambar dan mendapatkan prediksi dari model AI",
            termsOfService: "http://example.com/terms/",
            contact: {
                name: "API Support",
                url: "http://www.exmaple.com/support",
                email: "support@example.com",
            },
        },
        servers: [
            {

                url: process.env.BASE_URL || "https://sec-prediction-app-backend.vercel.app",
              
            },
            // {
            //     url: "http://0.0.0.0:0000",
            //     description: "Production server",
            // },
        ],
    },
    apis: [__dirname + "/../routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css" }));

    const swaggerDistPath = require("swagger-ui-dist").getAbsoluteFSPath();
    app.use("/docs", express.static(swaggerDistPath));

    swaggerUi.setup(swaggerDocs, {
        customCss:'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }', customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
    })

    const serverUrls = swaggerOptions.definition.servers.map(server => server.url);
    serverUrls.forEach(url => console.log(`Swagger docs available at : ${url}/docs`));
};

module.exports = setupSwagger;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
require('dotenv').config();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            "title": "FixKan Application API",
            "summary": "Computer Vision base APP",
            "description": "A Computer Vision based application that enables the public to report the condition of government infrastructure.",
            "termsOfService": "https://example.com/terms/",
            "contact": {
              "name": "API Support",
              "url": "https://www.example.com/support",
              "email": "support@example.com"
            },
            "license": {
              "name": "Apache 2.0",
              "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
            },
            "version": "1.0.1"
          },          
        servers: [
            {
                url: `http://localhost:${ process.env.PORT }`,
                description: "Development server",
            },
            {
                url: `${process.env.PRE_PRODUCTION_SERVER}`,
                description: "Pre-Production server",
            },
            {
                url: "https://0.0.0.0:0000",
                description: "Production server",
            },
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
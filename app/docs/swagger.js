const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
                url: "http://localhost:3000",
                description: "Local server",
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
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    const serverUrls = swaggerOptions.definition.servers.map(server => server.url);
    serverUrls.forEach(url => console.log(`Swagger docs available at : ${url}/docs`));
};

module.exports = setupSwagger;

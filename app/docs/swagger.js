const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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
                url: "https://sec-prediction-app-backend.vercel.app",
            },
        ],
    },
    apis: [__dirname + "/../routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs, {
            customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
        })
    );
};

module.exports = setupSwagger;

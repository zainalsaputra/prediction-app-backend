const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
                url: process.env.BASE_URL || "https://prediction-app-backend.vercel.app",
            },
        ],
    },
    apis: ["src/**/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs, { customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css" })
    );

    console.log("Swagger docs available at /docs");
};

module.exports = setupSwagger;

const cors = require("cors");
const express = require('express');
const setupSwagger = require('./docs/swagger');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

const routes = require('./routes/index');
app.use(routes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT : ${PORT}`);
//   console.log("Swagger docs available at http://localhost:3000/docs");
// });

module.exports = app;
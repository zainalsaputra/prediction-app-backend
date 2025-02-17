const express = require('express');
const setupSwagger = require('./docs/swagger');

require('dotenv').config();

const app = express();

app.use(express.json());

const routes = require('./routes/index');
app.use(routes);

setupSwagger(app);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT : ${PORT}`);
//   console.log("Swagger docs available at http://localhost:3000/docs");
// });

module.exports = app;
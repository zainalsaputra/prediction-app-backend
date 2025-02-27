const cors = require("cors");
const express = require('express');
const setupSwagger = require('./docs/swagger');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const routes = require('./routes/index');

const errorHandler = require('./middleware/errorHandler');

app.use(routes);

app.use(errorHandler);

setupSwagger(app);

const routes = require('./routes/index');
app.use(routes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT : ${PORT}`);
//   console.log("Swagger docs available at http://localhost:3000/docs");
// });

const db = require('./models');

db.sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected successfully!');
  })
  .catch((err) => {
    console.error('❌ Error connecting to database:', err);
  });

module.exports = app;

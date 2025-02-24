const express = require('express');
const setupSwagger = require('./docs/swagger');

require('dotenv').config();

const app = express();

app.use(express.json());

const routes = require('./routes/index');

const errorHandler = require('./middleware/errorHandler');

app.use(routes);

app.use(errorHandler);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

const db = require('./models');

db.sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected successfully!');
  })
  .catch((err) => {
    console.error('❌ Error connecting to database:', err);
  });

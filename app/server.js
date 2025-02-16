const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.json());

const routes = require('./routes/index');

app.use(routes);

app.use((req, res, next) => {
  res.redirect('/not-found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

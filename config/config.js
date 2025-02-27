require('dotenv').config();
const pg = require('pg');

const config = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT || 'mysql',
    dialectModule: pg,
    logging: process.env.DEV_DB_LOGGING === 'true' ? console.log : false,
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT || 'mysql',
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.PROD_DB_DIALECT || 'mysql',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Atur false jika ada masalah sertifikat SSL
      },
    },
    logging: false,
  },
};

module.exports = config;
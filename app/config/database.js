const config = require('../config/config')[process.env.NODE_ENV || 'production'];
module.exports = config;

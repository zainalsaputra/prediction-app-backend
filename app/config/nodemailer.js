const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // email kamu
        pass: process.env.EMAIL_PASS, // app password (bukan password biasa!)
    },
});

module.exports = transporter;

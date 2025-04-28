const rateLimit = require('express-rate-limit');

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 250,
    handler: (req, res) => {
        const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
        res.status(429).json({
            status: "error",
            message: `Too many requests, please try again in ${retryAfter} seconds.`,
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    handler: (req, res) => {
        const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
        res.status(429).json({
            status: "error",
            message: `Too many requests, please try again in ${retryAfter} seconds.`,
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// const loginLimiter = (err, req, res, next) => {
//     next(console.log('Login limiter temporary disabled for development'));
// } 

// const requestLimiter = ( err, req, res, next) => {
//     next(console.log('Request limiter temporary disabled for development'));
// } 

module.exports = { requestLimiter, loginLimiter };
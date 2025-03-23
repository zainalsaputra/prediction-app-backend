const rateLimit = require('express-rate-limit');

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
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
    max: 5,
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

module.exports = { requestLimiter, loginLimiter };

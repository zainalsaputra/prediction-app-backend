const createError = require('http-errors');

module.exports = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(createError(403, 'Forbidden: You do not have access'));
        }
        next();
    };
};

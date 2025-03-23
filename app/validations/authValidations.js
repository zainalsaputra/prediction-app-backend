const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    subdistrict: Joi.string().required(),
    village: Joi.string().required(),
    roleId: Joi.string().optional(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema,
    refreshTokenSchema
};

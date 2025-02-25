const Joi = require('joi');

const createReportSchema = Joi.object({
    userId: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    }),
    type_report: Joi.string().valid('Jalan Rusak', 'Bencana', 'Rumah Retak').required().messages({
        'string.base': 'Type report must be a string',
        'string.empty': 'Type report cannot be empty',
        'any.only': 'Invalid report type',
        'any.required': 'Type report is required',
    }),
    description: Joi.string().required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required',
    }),
    region: Joi.string().required().messages({
        'string.base': 'Region must be a string',
        'string.empty': 'Region cannot be empty',
        'any.required': 'Region is required',
    }),
    longitude: Joi.number().precision(8).required().messages({
        'number.base': 'Longitude must be a number',
        'any.required': 'Longitude is required',
    }),
    latitude: Joi.number().precision(8).required().messages({
        'number.base': 'Latitude must be a number',
        'any.required': 'Latitude is required',
    }),
    image: Joi.any().optional(),
});

const getReportByIdSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.base': 'ID must be a string',
        'string.empty': 'ID cannot be empty',
        'string.guid': 'ID must be a valid UUID',
        'any.required': 'ID is required',
    })
});

const updateReportSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.base': 'ID must be a string',
        'string.empty': 'ID cannot be empty',
        'string.guid': 'ID must be a valid UUID',
        'any.required': 'ID is required',
    }),
    type_report: Joi.string().valid('Jalan Rusak', 'Bencana', 'Rumah Retak').optional().messages({
        'string.base': 'Type report must be a string',
        'string.empty': 'Type report cannot be empty',
        'any.only': 'Invalid report type',
    }),
    description: Joi.string().optional().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
    }),
    region: Joi.string().optional().messages({
        'string.base': 'Region must be a string',
        'string.empty': 'Region cannot be empty',
    }),
    longitude: Joi.number().precision(8).optional().messages({
        'number.base': 'Longitude must be a number',
    }),
    latitude: Joi.number().precision(8).optional().messages({
        'number.base': 'Latitude must be a number',
    }),
    image: Joi.any().optional(),
});

const updateTypeReportSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.base': 'ID must be a string',
        'string.empty': 'ID cannot be empty',
        'string.guid': 'ID must be a valid UUID',
        'any.required': 'ID is required',
    }),
    type_report: Joi.string().valid('Jalan Rusak', 'Bencana', 'Rumah Retak').required().messages({
        'string.base': 'Type report must be a string',
        'string.empty': 'Type report cannot be empty',
        'any.only': 'Invalid report type',
        'any.required': 'Type report is required',
    }),
});

const deleteReportSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.base': 'ID must be a string',
        'string.empty': 'ID cannot be empty',
        'string.guid': 'ID is not found!',
        'any.required': 'ID is required',
    }),
});

module.exports = {
    createReportSchema, 
    getReportByIdSchema, 
    updateReportSchema,
    updateTypeReportSchema,
    deleteReportSchema
};

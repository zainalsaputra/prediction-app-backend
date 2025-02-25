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
    location: Joi.string().required().messages({
        'string.base': 'Location must be a string',
        'string.empty': 'Location cannot be empty',
        'any.required': 'Location is required',
    }),
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
    type_report: Joi.string().valid('Jalan Rusak', 'Bencana', 'Rumah Retak').required().messages({
        'string.base': 'Type report must be a string',
        'string.empty': 'Type report cannot be empty',
        'any.only': 'Invalid report type',
        'any.required': 'Type report is required',
    }),
    description: Joi.string().required(),
    location: Joi.string().required(),
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
        'string.guid': 'ID must be a valid UUID',
        'any.required': 'ID is required',
    }),
})

module.exports = {
    createReportSchema, 
    getReportByIdSchema, 
    updateReportSchema,
    updateTypeReportSchema,
    deleteReportSchema
};

const Joi = require('joi');

const createReportSchema = Joi.object({
    userId: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    }),
    // image: Joi.string().uri().required().messages({
    //     'string.base': 'Image must be a string',
    //     'string.empty': 'Image cannot be empty',
    //     'string.uri': 'Image must be a valid URL',
    //     'any.required': 'Image is required',
    // }),
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

module.exports = {
    createReportSchema, getReportByIdSchema
};

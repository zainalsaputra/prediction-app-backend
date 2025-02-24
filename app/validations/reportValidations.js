const Joi = require('joi');

const createReportSchema = Joi.object({
    // userId: Joi.string().uuid().required().messages({
    //     'string.base': 'User ID must be a string',
    //     'string.empty': 'User ID cannot be empty',
    //     'string.guid': 'User ID must be a valid UUID',
    //     'any.required': 'User ID is required',
    // }),
    userId: Joi.number().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    }),
    image: Joi.string().uri().required().messages({
        'string.base': 'Image must be a string',
        'string.empty': 'Image cannot be empty',
        'string.uri': 'Image must be a valid URL',
        'any.required': 'Image is required',
    }),
    type_report: Joi.string().required().messages({
        'string.base': 'Type of report must be a string',
        'string.empty': 'Type of report cannot be empty',
        'any.required': 'Type of report is required',
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

module.exports = createReportSchema;

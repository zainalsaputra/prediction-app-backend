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
    userId: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
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

const searchReportsSchema = Joi.object({
    type_report: Joi.string().optional().messages({
        'string.base': 'Type report must be a string',
        'any.only': 'Invalid report type',
    }),
    region: Joi.string().optional().messages({
        'string.base': 'Region must be a string',
    }),
    userId: Joi.string().uuid().optional().messages({
        'string.base': 'User ID must be a string',
        'string.guid': 'User ID must be a valid UUID',
    }),
    startDate: Joi.date().iso().optional().messages({
        'date.base': 'Start date must be a valid date in YYYY-MM-DD format',
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional().messages({
        'date.base': 'End date must be a valid date in YYYY-MM-DD format',
        'date.greater': 'End date must be later than start date',
    }),
    sortBy: Joi.string().valid('createdAt', 'updatedAt', 'type_report', 'region').optional().messages({
        'string.base': 'Sort field must be a string',
        'any.only': 'Invalid sorting field',
    }),
    order: Joi.string().valid('ASC', 'DESC').optional().messages({
        'string.base': 'Order must be a string',
        'any.only': 'Order must be "ASC" or "DESC"',
    }),
});

module.exports = {
    createReportSchema, 
    getReportByIdSchema, 
    updateReportSchema,
    updateTypeReportSchema,
    deleteReportSchema,
    searchReportsSchema
};

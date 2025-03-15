const Joi = require('joi');

const createPostReportSchema = Joi.object({
    postId: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    }),
    reportedBy: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    }),
    reason: Joi.string().required().valid('Spam', 'Palsu', 'Tidak Relavan').messages({
        'string.base': 'Reason must be a string',
        'string.guid': 'Reason must be a valid UUID',
        'any.required': 'Reason is required',
        'any.only': 'Invalid reason field',
    }),
});

const searchPostReportsSchema = Joi.object({
    id: Joi.string().uuid().optional().messages({
        'string.base': 'ID must be a string',
        'string.guid': 'ID must be a valid UUID',
    }),
    postId: Joi.string().uuid().optional().messages({
        'string.base': 'POST ID must be a string',
        'string.guid': 'POST ID must be a valid UUID',
    }),
    reportedBy: Joi.string().uuid().optional().messages({
        'string.base': 'POST ID must be a string',
        'string.guid': 'POST ID must be a valid UUID',
    }),
   status: Joi.string().optional().valid('Pending', 'Reviewed', 'Resolved').messages({
        'string.base': 'User ID must be a string',
        'string.guid': 'User ID must be a valid UUID',
        'any.only': 'Invalid status field',
    }),
   reason: Joi.string().optional().valid('Spam', 'Palsu', 'Tidak Relavan').messages({
        'string.base': 'User ID must be a string',
        'string.guid': 'User ID must be a valid UUID',
        'any.only': 'Invalid reason field',
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
})

const updateStatusPostReportSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    }),
    status: Joi.string().required().valid('Pending', 'Reviewed', 'Resolved').messages({
        'string.base': 'status must be a string',
        'string.empty': 'status cannot be empty',
        'any.required': 'status is required',
        'any.only': 'Invalid status field',
    })
})

const deletePostReportSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    })
})

module.exports = {
    createPostReportSchema,
    searchPostReportsSchema,
    updateStatusPostReportSchema,
    deletePostReportSchema,
}
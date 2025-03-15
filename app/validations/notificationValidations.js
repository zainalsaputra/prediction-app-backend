const Joi = require('joi');

const getNotificationsByUserIdSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'string.guid': 'User ID must be a valid UUID',
        'any.required': 'User ID is required',
    }),
});

const getDetailNotificationSchema = Joi.object({
   id: Joi.string().uuid().required().messages({
        'string.base': 'Notification ID must be a string',
        'string.empty': 'Notification ID cannot be empty',
        'string.guid': 'Notification ID must be a valid UUID',
        'any.required': 'Notification ID is required',
    }),
});

module.exports = {
    getNotificationsByUserIdSchema,
    getDetailNotificationSchema,
}
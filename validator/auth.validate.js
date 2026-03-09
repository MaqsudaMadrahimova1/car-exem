const Joi = require("joi");

const profileUpdateSchema = Joi.object({
    full_name: Joi.string().min(3).optional(),
    bio: Joi.string().max(200).optional()
});

module.exports = { profileUpdateSchema };
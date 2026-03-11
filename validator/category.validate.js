const Joi = require("joi");

const categoryValidator = Joi.object({
  modelName: Joi.string().min(3).max(60).required(),
  image: Joi.string().uri().required()

});

module.exports = categoryValidator;
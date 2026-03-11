const Joi = require("joi");

const CategorySchema = Joi.object({
  modelName: Joi.string().min(3)
    .max(60)
    .required(),
  image: Joi.string()
    .uri()
    .required()

});

module.exports = CategorySchema;
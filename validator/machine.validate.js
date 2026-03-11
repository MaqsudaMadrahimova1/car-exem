const Joi = require("joi");

const machineValidator = Joi.object({

    name: Joi.string()
        .min(2)
        .max(50)
        .required(),
    
    brand: Joi.string()
        .required(),
     
    price: Joi.number()
        .positive()
        .required(),

    image: Joi.string()
        .uri()
        .required(),
    categoryId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
  
});

module.exports = machineValidator;
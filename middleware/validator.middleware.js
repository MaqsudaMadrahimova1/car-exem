const CustomErrorHandler = require("../error/custom-error.handler");
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { 
            abortEarly: false, 
            stripUnknown: true 
        });

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message).join(", ");
            return next(CustomErrorHandler.BadRequest(errorMessages));
        }
        next();
    };
};

module.exports = validate;
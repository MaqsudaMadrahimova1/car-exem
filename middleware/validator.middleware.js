const CustomErrorHandler = require("../error/custom-error.handler");

const validate = (schema) => {
    return (req, res, next) => {

        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {

            const errorMessages = error.details.map(err => err.message);

            return next(CustomErrorHandler.badRequest(errorMessages));
        }

        next();
    };
};

module.exports = validate;
const { profileUpdateSchema } = require("../validator/...");

module.exports = (req, res, next) => {
    const { error } = profileUpdateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};
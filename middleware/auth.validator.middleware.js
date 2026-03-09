const { profileUpdateSchema } = require("../validator/auth.validate");

module.exports = (req, res, next) => {
    const { error } = profileUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};
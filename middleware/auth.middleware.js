const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/custom-error.handler");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(CustomErrorHandler.Unauthorized("not found Token "));
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        next(CustomErrorHandler.Unauthorized("Tugagan"));
    }
};
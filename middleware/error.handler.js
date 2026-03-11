const logger = require("../utils/logger"); 

module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    logger.error(`${status} - ${message} - ${req.method} ${req.url} - ${req.ip}`);

    res.status(status).json({
        success: false,
        status,
        message
    });
};
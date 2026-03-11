const winston = require("winston");
require("winston-mongodb"); 
require("dotenv").config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: "logs/error.log", 
      level: "error" 
    }),

    new winston.transports.File({ 
      filename: "logs/warning.log", 
      level: "warn" 
    }),

    new winston.transports.File({ 
      filename: "logs/combined.log" 
    }),

    new winston.transports.MongoDB({
      db: process.env.MONGO_URL,
      options: { useUnifiedTopology: true },
      collection: "logs", 
      level: "info",
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
});

module.exports = logger;
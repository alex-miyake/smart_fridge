// logger instance (to be used anywhere in the backend)

/*
USAGE EXAMPLE:
const logger = require('../utils/logger');

try {
  // some code
} catch (err) {
  logger.error(err); 
}

// Event logging
logger.info('User registered successfully'); 

// Progress logging (UX-style trace)
logger.info(`Fridge item ${itemId} updated for user ${userId}`);

*/
 
const winston = require('winston');
const path = require('path');

// Create logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message, stack}) => {
            return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
        })
    ),
    // log destination files
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, '../logs/events.log'), level: 'info'})
    ],
});

// log to console (for development)
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;
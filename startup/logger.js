const winston = require('winston')
require('winston-mongodb')

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({
            filename: 'logfile.log',
        }),
    ],
    exceptionHandlers: [
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'exceptions.log' }),
    ],
    rejectionHandlers: [
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'rejections.log' }),
    ],
})

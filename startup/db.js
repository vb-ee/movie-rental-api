const mongoose = require('mongoose')
const logger = require('./logger')

module.exports = () => {
    mongoose
        .connect('mongodb://localhost/projectdb')
        .then(() => logger.info('Connected to the database.'))
}

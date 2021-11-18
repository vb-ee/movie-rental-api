const express = require('express')
const winston = require('winston')
const app = express()

require('./startup/logger')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
if (process.env.ENV === 'production') {
    require('./startup/prod')(app)
}

const port = process.env.PORT || 3000

app.listen(port, () => {
    winston.info(`Listening on port ${port}`)
})

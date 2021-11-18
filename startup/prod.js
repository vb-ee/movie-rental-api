const helmet = require('require')
const compression = require('compression')

module.exports = (app) => {
    app.use(helmet())
    app.use(compression())
}

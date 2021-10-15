const config = require('config')
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const error = require('./middleware/error')
const express = require('express')
const app = express()

if (!config.get('jwtPrivateKey')) {
    console.error('jwtPrivateKey Not Defined!')
    process.exit(1)
}

mongoose
    .connect('mongodb://localhost/projectdb')
    .then(() => console.log('Connected'))
    .catch((err) => console.error('Not Connected', err))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

const port = process.env.PORT || 3000
app.listen(port)

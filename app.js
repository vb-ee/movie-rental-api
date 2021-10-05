const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/projectdb')
    .then(() => console.log('Connected'))
    .catch(err => console.error('Not Connected', err))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use((req, res) => res.status(404).send('Not Found'))

const port = process.env.PORT || 3000
app.listen(port)
const express = require('express')
const Joi = require('joi')
const genres = require('./genres')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Simple Route Handler API')
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }

    genres.push(genre)
    res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("No such a genre")

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.genre = req.body.genre
    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("No such a genre")

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("No such a genre")
    res.send(genre)
})

const validateGenre = (genre) => {
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    })

    return schema.validate(genre)
}

const port = process.env.PORT || 3000

app.listen(port)
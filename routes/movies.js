const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const Movie = require('../models/movie')
const { Genre } = require('../models/genre')
const validateMovie = require('../models/validation')
const express = require('express')
const router = express.Router()

router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        res.send(await Movie.find().sort('title'))
    })
)

router.post(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validateMovie(req.body, 'movie')
        if (error) return res.status(400).send(error.details[0].message)

        const genre = await Genre.findById(req.body.genreId)
        if (!genre) return res.status(400).send('Invalid genre!')

        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name,
            },
            numberInStock: req.body.numberInStock,
            dailyRentRate: req.body.dailyRentRate,
        })
        res.send(await movie.save())
    })
)

router.put(
    '/:id',
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validateMovie(req.body, 'movie')
        if (error) return res.status(400).send(error.details[0].message)

        const genre = await Genre.findById(req.body.genreId)
        if (!genre) return res.status(400).send('Invalid genre!')

        let movie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    genre: {
                        _id: genre._id,
                        name: genre.name,
                    },
                    numberInStock: req.body.numberInStock,
                    dailyRentRate: req.body.dailyRentRate,
                },
            },
            { new: true }
        )

        if (!movie) return res.status(404).send('Movie Not Found.')
        res.send(movie)
    })
)

router.delete(
    '/:id',
    auth,
    asyncMiddleware(async (req, res) => {
        const movie = await Movie.findByIdAndDelete(req.params.id)
        if (!movie) return res.status(404).send('Movie Not Found.')
        res.send(movie)
    })
)

router.get(
    '/:id',
    asyncMiddleware(async (req, res) => {
        const movie = await Movie.findById(req.params.id)
        if (!movie) return res.status(404).send('Movie Not Found.')
        res.send(movie)
    })
)

module.exports = router

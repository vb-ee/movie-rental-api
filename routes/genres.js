const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { Genre } = require('../models/genre')
const validateGenre = require('../models/validation')
const express = require('express')
const router = express.Router()

router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        res.send(await Genre.find().sort('name'))
    })
)

router.post(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validateGenre(req.body, 'genre')
        if (error) return res.status(400).send(error.details[0].message)

        let genre = new Genre({
            name: req.body.name,
        })

        genre = await genre.save()
        res.send(genre)
    })
)

router.put(
    '/:id',
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validateGenre(req.body, 'genre')
        if (error) return res.status(400).send(error.details[0].message)

        const genre = await Genre.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                },
            },
            { new: true }
        )

        if (!genre) return res.status(404).send('Genre Not Found.')
        res.send(genre)
    })
)

router.delete(
    '/:id',
    [auth, admin],
    asyncMiddleware(async (req, res) => {
        const genre = await Genre.findByIdAndDelete(req.params.id)
        if (!genre) return res.status(404).send('Genre Not Found.')
        res.send(genre)
    })
)

router.get(
    '/:id',
    asyncMiddleware(async (req, res) => {
        const genre = await Genre.findById(req.params.id)
        if (!genre) return res.status(404).send('Genre Not Found.')
        res.send(genre)
    })
)

module.exports = router

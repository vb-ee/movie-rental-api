const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { Genre } = require('../models/genre')
const validateGenre = require('../models/validation')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await Genre.find().sort('name'))
})

router.post('/', auth, async (req, res) => {
    const genre = new Genre({
        name: req.body.name,
    })

    try {
        res.send(await genre.save())
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validateGenre(req.body, 'genre')
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const genre = await Genre.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                },
            },
            { new: true }
        )

        res.send(genre)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        res.send(await Genre.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        res.send(await Genre.findById(req.params.id))
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router

const auth = require('../middleware/auth')
const Rental = require('../models/rental')
const Customer = require('../models/customer')
const Movie = require('../models/movie')
const validateRental = require('../models/rental')
const Fawn = require('fawn')
const express = require('express')
const router = express.Router()

Fawn.init('mongodb://localhost/projectdb')

router.get('/', async (req, res) => {
    res.send(await Rental.find().sort('-dateOut'))
})

router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body, 'rental')
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send('Customer Not Found!')

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send('Movie Not Found!')

    if (movie.numberInStock === 0)
        return res.status(400).send('Movie Not Found!')

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isPremium: customer.isPremium,
            phone: customer.phone,
        },

        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentRate: movie.dailyRentRate,
        },
    })

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update(
                'movies',
                { _id: movie._id },
                {
                    $inc: { numberInStock: -1 },
                }
            )
            .run()
        res.send(rental)
    } catch (error) {
        res.status(500).send('Failed!')
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        res.send(await Rental.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        res.send(await Rental.findById(req.params.id))
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router

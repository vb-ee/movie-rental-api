const Rental = require('../models/rental')
const Customer = require('../models/customer')
const Movie = require('../models/movie')
const validateRental = require('../models/rental')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await Rental.find().sort('-dateOut'))   
})

router.post('/', async (req, res) => {
    try {
        validateMovie(req.body, 'rental')

        let customer = await Customer.findById(req.body.customerId)
        if (!customer) return res.status(400).send('Customer Not Found!')

        let movie = await Movie.findById(req.body.movieId)
        if (!movie) return res.status(400).send('Movie Not Found!')

        if (movie.numberInStock === 0) return res.status(400).send('Movie Not Found!')

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                isPremium: customer.isPremium,
                phone: customer.phone
            },

            movie: {
                _id: movie._id,    
                title: movie.title,
                dailyRentRate: movie.dailyRentRate
            }
        })   
        movie.numberInStock--
        movie.save()

        res.send(await rental.save())       
    } catch (error) {
        res.status(400).send(error.details[0].message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { error } = validateRental(req.body, 'movie')
        if(error) return res.status(400).send(error.details[0].message)

        let customer = await Customer.findById(req.body.customerId)
        if (!customer) return res.status(400).send('Customer Not Found!')

        let movie = await Movie.findById(req.body.movieId)
        if (!movie) return res.status(400).send('Movie Not Found!')

        let rental = await Rental.findByIdAndUpdate(req.params.id, {
            $set: {
                customer: {
                    _id: customer._id,
                    name: customer.name,
                    isPremium: customer.isPremium,
                    phone: customer.phone
                },

                movie: {
                    _id: movie._id,
                    title: movie.name,
                    phone: movie.phone,
                    dailyRentRate: movie.dailyRentRate
                },
                dateOut: req.body.dateOut,
                dateReturned: req.body.dateReturned,
                rentalFee: req.body.rentalFee
            }
        }, { new: true})

        res.send(rental)         
    } catch (error) {        
        res.status(404).send(error.message) 
    }
})    

router.delete('/:id', async (req, res) => {
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
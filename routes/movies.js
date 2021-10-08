const Movie = require('../models/movie')
const { Genre } = require('../models/genre') 
const validateMovie = require('../models/validation')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await Movie.find().sort('title'))   
})

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body, 'movie')
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre!')
    
    try {
        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,    
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentRate: req.body.dailyRentRate
        })   
        res.send(await movie.save())
    } catch (error) {
        res.status(400).send(error.details[0].message)
    }
})

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body, 'movie')
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre!')
    
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentRate: req.body.dailyRentRate               
            }
        }, { new: true})

        res.send(movie)         
    } catch (error) {        
        res.status(404).send(error.message) 
    }
})    

router.delete('/:id', async (req, res) => {
    try {
        res.send(await Movie.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})    

router.get('/:id', async (req, res) => {
    try {        
        res.send(await Movie.findById(req.params.id))            
    } catch (error) {
        return res.status(404).send(error.message)        
    }
})    

module.exports = router
const mongoose = require('mongoose')
const { genreSchema } = require('./genre')

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,    
        required: true,
        trim: true, 
        minlength: 2, 
        maxlength: 50 
    },

    genre: {
        type: genreSchema,
        required: true
    },

    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

    dailyRentRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}))

module.exports = Movie
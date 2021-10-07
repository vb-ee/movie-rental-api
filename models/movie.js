const mongoose = require('mongoose')

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,    
        required: true,
        trim: true, 
        minlength: 2, 
        maxlength: 50 
    },

    genre: {
        type: new mongoose.Schema({
            name: { 
                type: String, 
                required: true, 
                minlength: 3, 
                maxlength: 50 
            }   
        }),
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
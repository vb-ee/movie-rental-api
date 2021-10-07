const mongoose = require('mongoose')

const Rental = mongoose.model('Movies', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,    
                required: true,
                minlength: 2, 
                maxlength: 50
            },
            
            isPremium: {
                type: Boolean,
                default: false
            },
    
            phone: {
                type: String,
                required: true
            }
    
        }),
        required: true
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,    
                required: true,
                trim: true, 
                minlength: 2, 
                maxlength: 50 
            },

            dailyRentRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturned: {
        type: Date
    },

    rentalFee: {
        type: Number,
        min: 0
    }
}))

module.exports = Rental
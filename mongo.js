const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/database')
    .then(() => console.log('Connected'))
    .catch(err => console.error('Not Connected', err))

module.exports.Genre = mongoose.model('Genre', new mongoose.Schema({
    name: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 50 }        
}))

module.exports.Customer = mongoose.model('Customer', new mongoose.Schema({
    isPremium: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,    
        required: true, 
        minlength: 2, 
        maxlength: 50 },
    phone:{
        type: Number,
        required: true,
        min: 5,
        max: 50
    }    
}))
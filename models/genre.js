const mongoose = require('mongoose')

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 50 
    }   
}))   

module.exports = Genre
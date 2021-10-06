const Joi = require('joi')

const validateDocument = (document, schemaToValidate) => {
    switch(schemaToValidate){
        case 'genre': 
            return Joi.object({
                name: Joi.string().min(3).max(50).required() 
            })
        break

        case 'customer': 
            return Joi.object({
                name: Joi.string().min(2).max(50).required(),
                phone: Joi.string().min(5).max(50).required(),
                isPremium: Joi.boolean().default(false)
            })
        break
    }
}

module.exports = validateDocument
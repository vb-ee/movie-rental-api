const Joi = require('joi')

const validateDocument = (document, docType) => {
    switch(docType){
        case 'genre': 
            validation = Joi.object({
                name: Joi.string().min(3).max(50).required() 
            })
        break

        case 'customer': 
            validation = Joi.object({
                name: Joi.string().min(2).max(50).required(),
                phone: Joi.string().min(5).max(50).required(),
                isPremium: Joi.boolean().default(false)
            })
        break

        case 'movie':
            validation = Joi.object({
                title: Joi.string().min(2).max(50).required(),
                genreId: Joi.string().required(),
                numberInStock: Joi.number().min(0).required(),
                dailyRentRate: Joi.number().min(0).required()
            })
        break
    }

    return validation.validate(document)
}

module.exports = validateDocument
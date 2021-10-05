const Joi = require('joi')

const validateDocument = (document, genre = false) => {
    const customerSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isPremium: Joi.boolean().default(false)
    })

    const genreSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
    })

    if (genre) return genreSchema.validate(document)
    else return customerSchema.validate(document)
}

module.exports = validateDocument
const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const Customer = require('../models/customer')
const validateCustomer = require('../models/validation')
const express = require('express')
const router = express()

router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        res.send(await Customer.find().sort('name'))
    })
)

router.post(
    '/',
    auth,
    asyncMiddleware(async (req, res) => {
        let customer = new Customer({
            isPremium: req.body.isPremium,
            name: req.body.name,
            phone: req.body.phone,
        })

        const { error } = validateCustomer(customer, 'customer')
        if (error) return res.status(400).send(error.details[0].message)

        customer = await customer.save()
        res.send(customer)
    })
)

router.put(
    '/:id',
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validateCustomer(req.body, 'customer')
        if (error) return res.status(400).send(error.details[0].message)

        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    isPremium: req.body.isPremium,
                    name: req.body.name,
                    phone: req.body.phone,
                },
            },
            { new: true }
        )

        if (!customer) return res.status(404).send('Customer Not Found.')
        res.send(customer)
    })
)

router.delete(
    '/:id',
    auth,
    asyncMiddleware(async (req, res) => {
        const customer = await Customer.findByIdAndDelete(req.params.id)
        if (!customer) return res.status(404).send('Customer Not Found.')
        res.send(customer)
    })
)

router.get(
    '/:id',
    asyncMiddleware(async (req, res) => {
        const customer = await Customer.findById(req.params.id)
        if (!customer) return res.status(404).send('Customer Not Found.')
        res.send(customer)
    })
)

module.exports = router

const Customer = require('../models/customer')
const validateCustomer = require('../models/validation')
const express = require('express')
const router = express() 


router.get('/', async (req, res) => {
    res.send(await Customer.find().sort('name'))   
})

router.post('/', async (req, res) => {
    const customer = new Customer({
        isPremium: req.body.isPremium,
        name: req.body.name,
        phone: req.body.phone
    })   

    try {
        res.send(await customer.save())       
    } catch (error) {
        return res.status(400).send(error.message)
    }
})


router.put('/:id', async (req, res) => {
    try {
        const { error } = validateCustomer(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: {
                isPremium: req.body.isPremium,
                name: req.body.name,
                phone: req.body.phone
            }
        }, { new: true })

        res.send(customer)         
    } catch (error) {        
        res.status(404).send(error.message) 
    }
})    


router.delete('/:id', async (req, res) => {
    try {
        res.send(await Customer.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})    

router.get('/:id', async (req, res) => {
    try {        
        res.send(await Customer.findById(req.params.id))            
    } catch (error) {
        return res.status(404).send(error.message)        
    }
})    

module.exports = router
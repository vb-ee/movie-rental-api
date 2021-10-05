const express = require('express')
const Customer = require('./mongo')

const app = express()
app.use(express.json())    
    

app.get('/api/customers', async (req, res) => {
    res.send(await Customer.find().sort('name'))   
})


app.post('/api/cutomers', async (req, res) => {
    const customer = new Customer({
        isPremium: req.body.isPremium,
        name: req.body.name,
        name: req.body.phone
    })   

    try {
        res.send(await customer.save())       
    } catch (error) {
        return res.status(400).send(error.message)
    }
})


app.put('/api/cutomers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if (!customer) return res.status(404).send('No such a customer!') 

        customer.isPremium = req.body.isPremium
        customer.name = req.body.name
        customer.phone = req.body.phone

        res.send(await customer.save())         
    } catch (error) {        
        res.status(400).send(error.message) 
    }
})    


app.delete('/api/customers/:id', async (req, res) => {
    try {
        res.send(await Customer.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})    

app.get('/api/customers/:id', async (req, res) => {
    try {        
        res.send(await Customer.findById(req.params.id))            
    } catch (error) {
        return res.status(404).send(error.message)        
    }
})    

const port = process.env.PORT || 3000

app.listen(port)
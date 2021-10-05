const express = require('express')
const Genre = require('./mongo')

const app = express()
app.use(express.json())    
    
    
app.get('/', (req, res) => {
    res.send('Simple Route Handler API Project with MongoDB')
})
    

app.get('/api/genres', async (req, res) => {
    res.send(await Genre.find().sort('name'))   
})


app.post('/api/genres', async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    })   

    try {
        res.send(await genre.save())       
    } catch (error) {
        return res.status(400).send(error.message)
    }
})


app.put('/api/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id)
        if (!genre) return res.status(404).send('No such a genre!') 

        genre.name = req.body.name
        
        res.send(await genre.save())         
    } catch (error) {        
        res.status(400).send(error.message) 
    }
})    


app.delete('/api/genres/:id', async (req, res) => {
    try {
        res.send(await Genre.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})    

app.get('/api/genres/:id', async (req, res) => {
    try {        
        res.send(await Genre.findById(req.params.id))            
    } catch (error) {
        return res.status(404).send(error.message)        
    }
})    

const port = process.env.PORT || 3000

app.listen(port)
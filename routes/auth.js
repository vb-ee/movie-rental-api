const bcrypt = require('bcrypt')
const User = require('../models/user')
const validateAuth = require('../models/validation')
const express = require('express')
const router = express()

router.post('/', async (req, res) => {
    const { error } = validateAuth(req.body, 'auth')
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password!')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid password!')

    const token = user.generateAuthToken()
    res.send(token)
})

module.exports = router

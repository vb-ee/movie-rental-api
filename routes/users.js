const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const User = require('../models/user')
const validateUser = require('../models/validation')
const express = require('express')
const router = express()

router.get('/me', auth, async (req, res) => {
    res.send(await User.findById(req.user._id).select('-password'))
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body, 'user')
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already exists!')

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        const token = user.generateAuthToken()

        res.header('x-auth-token', token).send(
            _.pick(user, ['_id', 'name', 'email'])
        )
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = router

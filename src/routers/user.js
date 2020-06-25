const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


//Create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//User log in
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send()
    }
})

//User log out
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

//User log out of all sessions
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

//Read user profile
router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})


//Update user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//Delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router
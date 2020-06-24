const express = require('express')
const router = new express.Router()
const User = require('../models/user')


//Create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)

    }
})

//Read all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(202).send(users)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//Read user
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.status(202).send(user)
    }
    catch (e) {
        res.status(500).send()
    }
})

//Update user
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    const _id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router
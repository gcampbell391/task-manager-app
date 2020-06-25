const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

//Create task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(200).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//Read all tasks
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        // await req.user.populate('tasks').execPopulate()
        res.status(200).send(tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

//Read task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send()
    }
})

//Update task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(task)
    }
    catch (e) {
        res.status(404).send(e)
    }
})

//Delete task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router

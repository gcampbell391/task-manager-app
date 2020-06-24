const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Create a single User
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)

    }
})

//Read all Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(202).send(users)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//Read a single User
app.get('/users/:id', async (req, res) => {
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

//Create a single Task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(200).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//Read all Tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

//Read a single Task
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}...`)
})
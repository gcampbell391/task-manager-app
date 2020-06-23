const mongoose = require('mongoose')
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
const validator = require('validator')

//Connect to db
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

//Create User model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can't contain the word password")
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

//Create Task model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const newTask = new Task({
    description: 'Go to the gym and complete leg day'
})
newTask.save().then(() => {
    console.log(newTask)
}).catch(error => {
    console.log('Error: ', error)
})

// const me = new User(
//     {
//         name: 'Larry',
//         email: 'L83@GMAIL.COM',
//         password: 'pas123',
//         age: 21
//     })
// me.save().then(() => {
//     console.log(me)
// }).catch(error => {
//     console.log('Error: ', error)
// })
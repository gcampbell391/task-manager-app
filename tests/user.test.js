const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')

//Test user
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Larry',
    email: 'Larry@gmail.com',
    password: 'hipposarenotcool',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

//Deletes all users before tests run
beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

//Create new user test
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Dave',
        email: 'Dave@gmail.com',
        password: 'hipposarecool'
    }).expect(201)

    //Assert that the database was updated correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
})

//Log in user test
test('Should log in a user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

//Log in user failure test
test('Should fail to log in a user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'mypasswordis9'
    }).expect(400)
})

//Fetch user profile
test('Should fetch user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

//Should not fetch user profile
test('Should not fetch user profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

//Delete user
test('Should delete user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

//Should not delete user
test('Should not delete user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


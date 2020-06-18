//Is the same as below
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID\
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database...')
    }
    const db = client.db(databaseName)
    //Insert One document
    // db.collection('users').insertOne({
    //     name: 'Timmy',
    //     age: 25
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.')
    //     }
    //     console.log(result.ops)
    // })

    //Insert Many documents
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 32
    //     },
    //     {
    //         name: 'Beth',
    //         age: 26
    //     }], (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert users.')
    //         }
    //         console.log(result.ops)
    //     })


    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Take out the trash',
    //         completed: true
    //     },
    //     {
    //         description: 'Wash the truck',
    //         completed: false
    //     },
    //     {
    //         description: 'Take the dog for a walk',
    //         completed: true
    //     },
    //     {
    //         description: "Get an oil change",
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to add tasks')
    //     }
    //     console.log(result.ops)
    // })


})
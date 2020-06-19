const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database...')
    }
    const db = client.db(databaseName)

    //update one document in a collection
    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID('5eebc7a0f8a7e34373278f66')
    //     }, {
    //     $set: {
    //         name: 'Mike',
    //         age: 31
    //     }
    // }).then(result => {
    //     console.log(result)
    // }).catch(() => {
    //     console.log(error)
    // })

    //update many documents in a collection
    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then(result => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })


    //delete one document from a collection
    // db.collection('tasks').deleteOne(
    //     {
    //         description: 'Get an oil change'
    //     }).then(result => {
    //         console.log(result)
    //     }).catch(error => {
    //         console.log(error)
    //     })

})
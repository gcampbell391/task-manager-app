const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//Middleware to handle auth tokens 
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down for maintainance...It will be back up shortly!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}...`)
})
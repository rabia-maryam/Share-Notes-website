const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const usersRouter = require('./routes/userRouter')

app.use(express.json())
app.use(cors())

app.use('/user', usersRouter)

const mongodbURL = 'mongodb://localhost:27017/finalHackathon'
mongoose.connect(mongodbURL).then(
    ()=>{
        console.log("Database conntection success")
    }
).catch(
    (err)=>{
        console.log("Database conntection fail" , err)
    }
)

app.listen('5000', ()=>{
    console.log('Server Running on port 5000...')
})
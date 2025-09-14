const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const leadsRoutes = require('./routes/leads')

const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nikhilraikwar846:IkQU5yIBMpFIluLs@cluster0.a8u4r.mongodb.net/leads'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })

// Routes
app.use('/api/leads', leadsRoutes)

app.get('/',(req,res)=>{
    console.log("listening")
  return res.send('Hello World').status(200)
})

app.listen(4000,()=>{
    console.log("server started at 4000")
})
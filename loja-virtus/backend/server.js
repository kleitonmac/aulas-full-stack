const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// connect to database
const connectDB = require('./src/config/db')
connectDB()

// Routes
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/cart', require('./src/routes/cart'))
app.use('/api/orders', require('./src/routes/orders'))
app.use('/api/admin', require('./src/routes/admin'))

// global error handler (should be last middleware)
const errorHandler = require('./src/middleware/errorHandler')
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

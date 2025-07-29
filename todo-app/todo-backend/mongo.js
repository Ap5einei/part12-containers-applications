const mongoose = require('mongoose')
const Todo = require('./mongo/models/todo')

const mongoUrl = process.env.MONGO_URL

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err)
})

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

module.exports = { Todo }

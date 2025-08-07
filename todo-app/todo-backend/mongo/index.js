const mongoose = require('mongoose')
const Todo = require('../mongo/models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })


module.exports = {
  Todo
}

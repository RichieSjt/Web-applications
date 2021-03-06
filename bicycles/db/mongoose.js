//Setup mongoose
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/red_bicicletas'

mongoose.connect(mongoDB, {
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error: '))
// db.on('open', console.log.bind(console, 'MongoDB connection ok '))

module.exports = db
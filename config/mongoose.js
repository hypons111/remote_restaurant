const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection




db.on('error', () => {
  console.log('mongoose error')
})
db.once('open', () => {
  console.log('mongoose conneted')
})

module.exports = db
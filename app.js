const port = 3000
const express = require('express')
const app = express()
const expHan = require('express-handlebars')
const bodPar = require('body-parser')
const mongoose = require('mongoose')

app.engine('handlebars', expHan({ defalutLayouts: 'main' }))
app.set('view engine', 'handlbars')

app.use(bodPar.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error')
})
db.once('open', () => {
  console.log('mongoose conneted')
})


app.get('/', (req, res) => {
  res.send('Yes')
})

app.listen(port, () => {
  console.log('This server is listening to http://localhost:3000')
})
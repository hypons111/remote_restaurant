const port = 3000
const express = require('express')
const app = express()
const expHan = require('express-handlebars')
const bodPar = require('body-parser')
const db = require('./config/mongoose')
const metOve = require('method-override')


// 引用路由器
const routes = require('./routes')

app.engine('handlebars', expHan({ defalutLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodPar.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(metOve('_method'))

// 將 request 導入路由器
app.use(routes)




//  搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Todo.find({ name: keyword })
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))

  console.log(keyword)
})

app.listen(port, () => {
  console.log('This server is listening to http://localhost:3000')
})
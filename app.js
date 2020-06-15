const port = 3000
const express = require('express')
const app = express()
const expHan = require('express-handlebars')
const bodPar = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/todo')

app.engine('handlebars', expHan({ defalutLayouts: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodPar.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error')
})
db.once('open', () => {
  console.log('mongoose conneted')
})

app.use(express.static('public'))

//  首頁
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

//  新增頁
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

//  詳細頁
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log(id)

  //  以 id 去尋找
  return Todo.findById(id)
    //  「撈資料以後想用 res.render()，就要先用 .lean()」
    .lean()
    //  拿到資料後會被存在 todo 變數裡，傳給樣板引擎
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))

})

//  將新增的資料送往資料庫
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const phone = req.body.phone
  const location = req.body.location
  const description = req.body.description
  //  有兩個方法可以在資料庫新增資料


  // 方法一：
  // 在伺服器端由 Todo 產生一個實例
  // 然後將實例存入資料庫
  /*
    const todo = New Todo({ name })
    return todo.save()
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  */

  //  方法二：
  //  直接用 mongoose create 資料
  //  呼叫 Todo 物件直接新增資料
  return Todo.create({ name, category, image, phone, location, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//  修改頁
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  console.log(req)
  //  以 id 去尋找
  return Todo.findById(id)
    //  「撈資料以後想用 res.render()，就要先用 .lean()」
    .lean()
    //  拿到資料後會被存在 todo 變數裡，傳給樣板引擎
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//  將修改後的資料送往資料庫
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const phone = req.body.phone
  const location = req.body.location
  const description = req.body.description


  return Todo.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image
      restaurant.phone = phone
      restaurant.location = location
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//  刪除頁
app.post('/restaurants/:id/delete', (req, res) => {
  //  取得網址上的識別碼，用來查詢使用者想刪除的 To-do
  const id = req.params.id

  //  查詢資料，資料庫查詢成功以後，會把資料放進 todo
  return Todo.findById(id)
    //  「撈資料以後想用 res.render()，就要先用 .lean()」
    //  用 todo.remove() 刪除這筆資料
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//  bugfix 頁
app.get('/restaurant/restaurant/new', (req, res) => {
  res.redirect('/restaurant/new')
})

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
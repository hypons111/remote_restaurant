const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//  搜尋餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Todo.find({ name: keyword })
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))

  console.log(keyword)
})

module.exports = router
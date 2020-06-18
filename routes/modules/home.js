// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


//  首頁
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router
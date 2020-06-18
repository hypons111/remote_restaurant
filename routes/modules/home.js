// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


//  首頁
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

//  首頁 asc
router.get('/asc', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

//  首頁 desc
router.get('/desc', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'desc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

//  首頁 category
router.get('/category', (req, res) => {
  Todo.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

//  首頁 location
router.get('/location', (req, res) => {
  Todo.find()
    .lean()
    .sort({ location: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router
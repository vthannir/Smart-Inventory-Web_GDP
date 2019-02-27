const express = require('express')
const api = express.Router()
const find = require('lodash.find')
const remove = require('lodash.remove')


api.get('/', (req, res) => {
  res.render('intro/index.ejs')
})

api.get('/adminLogin', (req, res) => {
  res.render('intro/adminLogIn.ejs')
})

api.get('/userLogin', (req, res) => {
  res.render('intro/userLogIn.ejs')
})

module.exports = api
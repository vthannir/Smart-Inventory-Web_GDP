const express = require('express')
const api = express.Router()
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'products not found'


api.get('/', (req, res) => {
  res.render('user/userHome/index.ejs')
})

api.get('/payment', (req, res) => {
  res.render('user/userHome/payment.ejs')
})

module.exports = api

const express = require('express')
const api = express.Router()
const Model = require('../models/product.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'products not found'

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('admin/adminHome/index.ejs')
})

api.get('/announcement', (req, res) => {
  res.render('admin/adminHome/announcements.ejs')
})

api.get('/shippingLabel', (req, res) => {
  res.render('admin/adminHome/shippingLabel.ejs')
})

// api.get('/addProduct', (req, res) => {
//   res.render('admin/adminHome/newProduct.ejs')
// })

api.get('/create', (req, res) => {
  const item = new Model()
  res.render('admin/adminHome/productDetails/newProduct.ejs',
  {
    product: item
  })
})

api.post('/save', (req, res) => {
  const data = req.app.locals.products.query
  const item = new Model()
  item._id = parseInt(req.body._id, 10)
  item.name = req.body.name
  item.description = req.body.description
  item.quantity = parseInt(req.body.quantity, 10)
  item.prize = parseInt(req.body.prize, 10)
  data.push(item)
  return res.redirect('/admin')
})

api.post('/save/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.app.locals.products.query
  const item = find(data, {_id: id})
  if(!item){
    res.end(notfoundstring)
  }
  item.name =req.body.name
  item.description =req.body.description
  item.quantity = parseInt(req.body.quantity, 10)
  item.prize = parseInt(req.body.prize, 10)
  return res.redirect('/admin')
})

api.get('/edit/:id', (req,res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.app.locals.products.query
  const item = find(data, {_id: id})
  if(!item){
    return res.end(notfoundstring)
  }
  return res.render('admin/adminHome/productDetails/editProduct.ejs', {
    product: item
  })
})

api.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.app.locals.products.query
  const item = find(data, {_id: id})
  if(!item){
    res.end(notfoundstring)
  }
  return res.render('admin/adminHome/productDetails/deleteProduct.ejs', {
    product: item
  })
})

api.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.app.locals.products.query
  const item = find(data, {_id: id})
  if(!item) {
    res.end(notfoundstring)
  }
  if(item.isActive){
    item.isActive = false
  } else {
    remove(data, {_id: id})
  }
  return res.redirect('/admin')
})

api.get('/details/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.app.locals.products.query
  const item = find(data, {_id: id})
  if(!item) {
    res.end(notfoundstring)
  }
  return res.render('admin/adminHome/productDetails/detailProduct.ejs', {
    product: item
  })
})

module.exports = api

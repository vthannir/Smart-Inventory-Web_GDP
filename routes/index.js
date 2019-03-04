/**
 * @index.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @requires express
 */
const express = require('express')
//  const app = express()
// var passport = require('passport');
const LOG = require('../utils/logger.js')

// LOG.debug('START routing')
const router = express.Router()

// module.exports = function (app, passport) {

// Manage top-level request first
router.get('/', (req, res, next) => {
  // LOG.debug('Request to /')
  res.render('index.ejs', { title: 'Express App' })
})

// Defer path requests to a particular controller
router.use('/admin', require('../controllers/admin.js'))
router.use('/user', require('../controllers/user.js'))
router.use('/intro', require('../controllers/intro'))
// LOG.debug('END routing')



module.exports = router;
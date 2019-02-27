const express = require('express')
const http = require('http')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const session = require('express-session')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const LOG = require('./utils/logger.js')


dotenv.load({ path: '.env' })
LOG.info('Environment variables loaded.')

const DEFAULT_PORT = 8089

const app = express()

app.set('port', process.env.PORT || DEFAULT_PORT)

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
app.use(expressStatusMonitor())

app.use((req, res, next) => {
  LOG.debug('%s %s', req.method, req.url)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(expressLayouts)
app.use(errorHandler())

const routes = require('./routes/index.js')
app.use('/', routes) 
LOG.info('Loaded routing.')

app.use((req, res) => { res.status(404).render('404.ejs') })

require('./utils/seeder.js')(app)

app.listen(process.env.PORT || 8089, () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
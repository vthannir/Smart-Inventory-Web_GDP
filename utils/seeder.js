// set up a temporary (in memory) database
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')
const products = require('../data/products.json')

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = new Datastore()
  db.loadDatabase()

  // insert the sample data into our data store
  db.insert(products)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.products = db.find(products)
  app.locals.input = ""
  LOG.debug(`${products.length} products`)
  LOG.info('END Seeder. Sample data read and verified.')
}

// module.exports = (app) => {
//   LOG.info('START seeder.')
//   const db = new Datastore()
//   db.loadDatabase()

//   // insert the sample data into our data store
//   db.insert(flights)

//   // initialize app.locals (these objects will be available to our controllers)
//   app.locals.flights = db.find(flights)

//   LOG.debug(`${flights.length} flights`)
//   LOG.info('END Seeder. Sample data read and verified.')
// }
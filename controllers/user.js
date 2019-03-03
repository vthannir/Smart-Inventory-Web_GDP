const express = require('express')
const api = express.Router()


api.get('/', (req, res) => {

  var db = req.db
  var collection = db.get('usercollection');

  collection.find({},{},function(e,docs){
    res.render('user/userHome/index.ejs', {
        "productsMongo" : docs
    });
  });

})

api.get('/payment', (req, res) => {
  res.render('user/userHome/payment.ejs')
})

api.get('/accept/:id', (req, res) => {

  var db = req.db
  var collectionOfUserAcceptedProducts = db.get('userAcceptance')

  var _id = parseInt(req.params.id, 10)

  collectionOfUserAcceptedProducts.insert({
    "_id":_id
  }, function (err, doc) {
    if (err) {
        res.send("There was a problem on adding the information to the database.");
    }
    else {
      console.log(docs)
      return res.redirect("/user");
    }
  })

})

module.exports = api

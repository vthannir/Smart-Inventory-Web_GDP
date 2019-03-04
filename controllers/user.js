const express = require('express')
const api = express.Router()
var accepted = true


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
  var collection = db.get('userAcceptance')

  var mainCollection = db.get('usercollection')

  var _id = parseInt(req.params.id, 10)
  accepted = false

  mainCollection.update({"_id": _id}, {$set: {"accepted": accepted}}, function(err, docs) {
    if(err) {
      res.send("There is a problem updating actual collection")
    }
  })

  collection.insert({
    "_id":_id
  }, function (err, doc) {
    if (err) {
        res.send("There was a problem on adding the information to the database.");
    }
    else {
      return res.redirect("/user");
    }
  })

})

api.get('/deny/:id', (req, res) => {

  var db = req.db
  var collection = db.get('userAcceptance')

  var mainCollection = db.get('usercollection')

  const id = parseInt(req.params.id, 10)
  accepted = true

  mainCollection.update({"_id": id}, {$set: {"accepted": accepted}}, function(err, docs) {
    if(err) {
      res.send("There is a problem updating actual collection")
    }
  })

  collection.remove({"_id" : id},function(err, docs) {
    if (err) {
      res.send("There was a problem deleting the information to the database.");
    }
    else {
        return res.redirect("/user");
    }
  })

})

module.exports = api

const express = require('express')
const api = express.Router()

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  var db = req.db
  var collection = db.get('usercollection');

  collection.find({},{},function(e,docs){
    res.render('admin/adminHome/index.ejs', {
        "productsMongo" : docs
    });
  });
})

api.get('/announcement', (req, res) => {

  var db = req.db
  var collection = db.get('userAcceptance');

  var actualCollection = db.get('usercollection');

  var items = [];

  collection.find({},{},function(e,docs){
    console.log("number of items: " + docs.length)
    for(var i=0; i<docs.length; i++) {
      actualCollection.findOne({"_id" : docs[i]._id}, function(err, item) {
        items.push(item);
      })
    }
    setTimeout(function() {
      res.render('admin/adminHome/announcements.ejs', {
      "productsMongo" : items
    });
  }, 1000)
 
  });

})

api.get('/shippingLabel', (req, res) => {
  res.render('admin/adminHome/shippingLabel.ejs')
})

api.get('/addProduct', (req, res) => {
  var db = req.db
  var collection = db.get('usercollection');

  collection.find({},{},function(e,docs){
    res.render('admin/adminHome/productDetails/newProduct.ejs', {
        "productsMongo" : docs
    });
  });
})

api.post('/save/:id', (req, res) => {

  var db = req.db
  var collection = db.get('usercollection')

  var _id = parseInt(req.params.id, 10)
  var name = req.body.name
  var description = req.body.description
  var quantity = parseInt(req.body.quantity, 10)
  var prize = parseInt(req.body.prize, 10)

  collection.insert({
        "_id":_id,
        "name": name,
        "description": description,
        "quantity": quantity,
        "prize": prize,
        "accepted": true
  }, function (err, doc) {
    if (err) {
        res.send("There was a problem adding the information to the database.");
    }
    else {
        return res.redirect("/admin");
    }
  })
})

api.post('/update/:id', (req, res) => {

  var db = req.db
  var collection = db.get('usercollection')

  var _id = parseInt(req.params.id, 10)
  var name = req.body.name
  var description = req.body.description
  var quantity = parseInt(req.body.quantity, 10)
  var prize = parseInt(req.body.prize, 10)

  collection.update({"_id":_id}, {
        "name": name,
        "description": description,
        "quantity": quantity,
        "prize": prize,
        "accepted": true
  }, function (err, doc) {
    if (err) {
        res.send("There was a problem updating the information to the database.");
    }
    else {
        return res.redirect("/admin");
    }
  })
})

api.get('/edit/:id', (req,res) => {

  var db = req.db
  var collection = db.get('usercollection')
  collection.findOne({"_id" : parseInt(req.params.id, 10)}, function(err, item) {
    res.render('admin/adminHome/productDetails/editProduct.ejs',{
      product: item 
    })
  })

})

api.get('/delete/:id', (req, res) => {

  var db = req.db
  var collection = db.get('usercollection')
  collection.findOne({"_id" : parseInt(req.params.id, 10)}, function(err, item) {
    res.render('admin/adminHome/productDetails/deleteProduct.ejs',{
      product: item 
    })
  })

})

api.post('/delete/:id', (req, res) => {

  var db = req.db
  var collection = db.get('usercollection')

  const id = parseInt(req.params.id, 10)

  collection.remove({"_id" : id},function(err, docs) {
    if (err) {
      res.send("There was a problem deleting the information to the database.");
    }
    else {
        return res.redirect("/admin");
    }
  })

})

api.get('/details/:id', (req, res) => {

  var db = req.db
  var collection = db.get('usercollection')
  console.log(req.params.id)
  collection.findOne({"_id" : parseInt(req.params.id, 10)}, function(err, item) {
    res.render('admin/adminHome/productDetails/detailProduct.ejs',{
      product: item 
    })
  })

})

module.exports = api

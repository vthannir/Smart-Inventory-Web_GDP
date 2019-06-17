const express = require('express')
// const app = express.Router()
var accepted = true

 const app = express.Router()
var passport = require('passport');
// module.exports = function (app, passport) {
  require('../config/passport')(passport);
var async = require('async');
var crypto = require('crypto');
var User       = require('../app/models/user');
var path = require("path");
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
app.get('/userHome/', (req, res) => {

  var db = req.db
  var collection = db.get('usercollection');

  collection.find({},{},function(e,docs){
    res.render('user/userHome/index.ejs', {
        "productsMongo" : docs
    });
  });

})

app.get('/payment', (req, res) => {
  res.render('user/userHome/payment.ejs')
})

app.get('/accept/:id', (req, res) => {

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

app.get('/deny/:id', (req, res) => {

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

app.get('/', function (req, res) {
  res.render('login.ejs', {
      message: req.flash('loginMessage'),
      message1: req.flash('success'),
      message2: req.flash("loginMessage1")
  });
});

// PROFILE SECTION =========================
app.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile.ejs', {
      user: req.user
  });
});

app.get('/forgot', function (req, res) {
  res.render('user/forgot.ejs', {
      message: req.flash('error_msg'),
      message1: req.flash('success_msg'),
  });
});

// LOGOUT ==============================
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
// show the login form
app.get('/login', function (req, res) {
  res.render('user/login.ejs', { 
    message: req.flash('loginMessage'),
    message1: req.flash('success'),
    message2: req.flash("loginMessage1") 
});
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/user/userHome/', // redirect to the secure profile section
  failureRedirect: '/user/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// SIGNUP =================================
// show the signup form
app.get('/signup', function (req, res) {
  res.render('user/signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/user/login', // redirect to the secure login section
  failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
app.get('/connect/local', function (req, res) {
  res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
app.post('/connect/local', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

// local -----------------------------------
app.get('/unlink/local', isLoggedIn, function (req, res) {
  var user = req.user;
  user.local.email = undefined;
  user.local.password = undefined;
  user.save(function (err) {
      res.redirect('/profile');
  });
});

//Forgot

app.post('/forgote', function(req, res, next) {
console.log("hi")
async.waterfall([
function(done) {
crypto.randomBytes(20, function(err, buf) {
  var token = buf.toString('hex');
  done(err, token);
});
},
function(token, done) {
User.findOne({'local.email': req.body.email }, function(err, user) {
 console.log(user)
  if (!user) {
    req.flash('error_msg', 'No account with that email address exists.');
    return res.redirect('back');
  }
 
  user.local.resetPasswordToken = token;
  user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  user.save(function(err) {
    done(err, token, user);
  });
});
},
function(token, user, done) {
var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gdp2.fastrack@gmail.com',
    pass: 'gdp21234'
  }
});
var mailOptions = {
  to: req.body.email,
  from: 'passwordreset@demo.com',
  subject: 'Node.js Password Reset',
  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://' + req.headers.host + '/user/reset/' + token + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
};
smtpTransport.sendMail(mailOptions, function(err) {
  req.flash('success_msg', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
  done(err, 'done');
});
}
], function(err) {
if (err) return next(err);
res.redirect('/user/forgot');
});
}); //end of forget

app.get('/reset/:token', function(req, res) {
User.findOne({'local.resetPasswordToken': req.params.token,'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
if (!user) {
req.flash('error', 'Password reset token is invalid or has expired.');
return res.redirect('user/login');
}
res.render('user/forgotP.ejs', {
token: req.params.token
});
});
});

//Reset
app.post('/reset/:token', function(req, res) {
async.waterfall([
function(done) {
User.findOne({ 'local.resetPasswordToken': req.body.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
  if (!user) {
    req.flash('error', 'Password reset token is invalid or has expired.');
    return res.redirect('user/login');
  }
  
      user.local.password = user.generateHash(req.body.password);
      user.local.resetPasswordToken = undefined;
      user.local.resetPasswordExpires = undefined;
      user.save(function(err) {
        req.logIn(user, function(err) {
           done(err, user);
        });
       }); 
});
},
function(user, done) {
var smtpTransport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'gdp2.fastrack@gmail.com',
    pass: 'gdp21234'
  }
});
var mailOptions = {
  to: req.user.email,
  from: 'passwordreset@demo.com',
  subject: 'Your password has been changed',
  text: 'Hello,\n\n' +
    'This is a confirmation that the password for your account ' + req.user.email + ' has just been changed.\n'
};
smtpTransport.sendMail(mailOptions, function(err) {
  req.flash('success', 'Success! Your password has been changed.');
  done(err);
});
}
], function(err) {
res.redirect('/user/login');
});
});    



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = app;
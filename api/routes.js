var express = require('express');
var router = express.Router();

var login = require('./login/login.controller');

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/admin', function (req, res, next) {
   res.render('admin')
});

router.get('/employee', function (req, res, next) {
   res.render('employee')
});

router.get('/admininformation', function (req, res, next) {
   res.render('admininformation')
});

router.get('/adminreview', function (req, res, next) {
    res.render('adminreview')
});

router.get('/employeereview', function (req, res, next) {
    res.render('employeereview.jade')
});

router.get('/adminpayment', function (req, res, next) {
    res.render('adminpayment.jade')
});

router.post('/login/login', function (req, res, next) {
    if (login.authenticate(req.body.email, req.body.password)) {
        res.redirect('/admin');
    } else {
        res.render('employee')
    }
});

router.post('/login/registration', function (req, res, next) {

    if (login.register(req.body.email, req.body.password)) {
        res.render('admin');
    }
});

module.exports = router;

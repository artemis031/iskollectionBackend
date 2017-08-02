var express = require('express');

//var user = require('./entities/user/user.router');
//var petition = require('./entities/petition/petition.router');
//var auth = require('./entities/auth/auth.router');

var router = new Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/petitions', petition);

module.exports = router;

var express = require('express');

var user = require('./entities/user/user.router');
var auth = require('./entities/auth/auth.router');

var router = new express.Router();

router.use('/auth', auth);
router.use('/users', user);

module.exports = router;

var express = require('express');
var Auth = require('./auth.controller');
var Util = require('../util.controller');
var router = new express.Router();

router.post('/login', async (req, res) => {
  try {
    await Util.validate(req.body, {
      email: 'string',
      password: 'string'
    });
    const user = await Auth.login(req.body);
    req.session.user = user;
    const data = {
      status: 200,
      message: 'Successfully logged in',
      items: user
    };
    console.log('hahah');
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post('/logout', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully logged out',
    items: null
  });
});

router.post('/session', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved session',
    items: req.session.user ? req.session.user : null
  });
});

module.exports = router;

var express = require('express');
var router = new express.Router();
var User = require('./user.controller');
var Util = require('../util.controller');

router.get('/:id', async (req, res) => {
  try {
    await Util.validate(req.params, {
      id: 'number'
    });
    const { id } = req.params;
    const user = await User.getById(id);
    const data = {
      status: 200,
      message: 'Successfully fetched users',
      items: user
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.getAll();
    const data = {
      status: 200,
      message: 'Successfully fetched all users',
      items: users
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await Util.validate(req.body, {
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      password: 'string'
    });
    /*await Util.validate(req.files || {}, {
      signature: 'object'
    });*/
    await User.validateEmail(req.body.email);
    await Util.beginTransaction();
    //const fileName = await Util.moveFile(req.body.email, req.files.signature);
    const userId = await User.create(req.body);
    // await Log.create(`Created user ${userId}`);
    await Util.commit();
    const user = await User.getById(userId);
    const data = {
      status: 201,
      message: 'Successfully created user',
      items: user
    };
    res.status(data.status).json(data);
  } catch (err) {
    console.log(err);
    await Util.rollback();
    res.status(err.status).json(err);
  }
});

router.post('/:userId/:repositoryId', async (req, res) => {
  try {
    await User.subscribeToRepo(req.params, {
      userId: 'number',
      repositoryId: 'number'
    });
    const data = {
      status: 201,
      message: 'Successfully subscribed.'
    };
    res.status(data.status).json(data);
  } catch (err) {
    console.log(err);
    await Util.rollback();
    res.status(err.status).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Util.validate(req.params, {
      id: 'number'
    });
    await Util.validate(req.body, {
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      password: 'string'
    });
    const { id } = req.params;
    const { email } = req.body;
    await User.getById(id);
    await User.validateEmail(email, id);
    await Util.beginTransaction();
    await User.update(id, req.body);
    await Log.create(`Updated user ${id}`);
    await Util.commit();
    const user = await User.getById(id);
    const data = {
      status: 200,
      message: 'Successfully updated user',
      items: user
    };
    res.status(data.status).json(data);
  } catch (err) {
    await Util.rollback();
    res.status(err.status).json(err);
  }
});

/*router.put('/:id/signature', async (req, res) => {
  try {
    await Util.validate(req.files, {
      signature: 'object'
    });
    const { id } = req.params;
    const { signature } = req.files;
    let user = await User.getById(id);
    await Util.beginTransaction();
    //const fileName = await Util.moveFile(user.email, signature);
    await User.updateSignature(id, fileName);
    user = await User.getById(id);
    const data = {
      status: 200,
      message: 'Successfully updated user signature',
      items: user
    };
    res.status(data.status).json(data);
  } catch (err) {
    await Util.rollback();
    res.status(err.status).json(err);
  }
});*/

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.removeById(id);
    const data = {
      status: 200,
      message: 'Successfully deleted user',
      items: null
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

module.exports = router;

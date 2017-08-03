import { Router } from 'express';
import * as Petition from './petition.controller';
import * as Util from '../util.controller';

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const petitions = await Petition.getAll();
    const data = {
      status: 200,
      message: 'Successfully fetched all petitions',
      items: petitions
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const petition = await Petition.getById(id);
    const data = {
      status: 200,
      message: 'Successfully fetched petition',
      items: petition
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await Util.validate(req.body, {
      semester: 'string',
      year: 'number',
      title: 'string',
      description: 'string'
    });
    const petitionId = await Petition.create(req.body);
    const petition = await Petition.getById(petitionId);
    const data = {
      status: 200,
      message: 'Successfully created petition',
      items: petition
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Util.validate(req.body, {
      semester: 'string',
      year: 'number',
      title: 'string',
      description: 'string',
      isApproved: 'number'
    });
    const { id } = req.params;
    await Petition.update(id, req.body);
    const petition = await Petition.getById(id);
    const data = {
      status: 200,
      message: 'Successfully updated petition',
      items: petition
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Petition.getById(id);
    await Petition.removeById(id);
    const data = {
      status: 200,
      message: 'Successfully deleted petition',
      items: null
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;

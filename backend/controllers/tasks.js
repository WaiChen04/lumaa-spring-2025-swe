const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { Task, User } = require('../models');
const { SECRET } = require('../util/config');

router.get('/', async (req, res) => {
  const where = {};


  if (req.query.userId) {
    where.userId = req.query.userId;
  }

  const tasks = await Task.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username']
    },
    where
  });

  res.json(tasks);
});

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  next();
};

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = await Task.create({
      ...req.body,
      userId: user.id
    });

    res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const taskFinder = async (req, res, next) => {
  req.task = await Task.findByPk(req.params.id);
  if (!req.task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  next();
};

router.get('/:id', taskFinder, async (req, res) => {
  res.json(req.task);
});

router.delete('/:id', taskFinder, async (req, res) => {
  await req.task.destroy();
  res.status(204).end();
});

router.put('/:id', taskFinder, async (req, res) => {
  const { title, description, isComplete } = req.body;

  if (title !== undefined) req.task.title = title;
  if (description !== undefined) req.task.description = description;
  if (isComplete !== undefined) req.task.isComplete = isComplete;

  await req.task.save();
  res.json(req.task);
});

module.exports = router;

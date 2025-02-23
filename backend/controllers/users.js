const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User, Task } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({ 
    include: {
      model: Task,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})


router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
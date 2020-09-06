const express = require('express')
const UserService = require('../services/User')

function usersRoutes (app) {
  const router = express.Router()
  app.use('/api/users', router)

  const User = new UserService()

  router.get('/', async (req, res) => {
    const user = await User.get()
    res.status(200).json(user)
  })

  router.post('/', async (req, res, next) => {
    const { user: userInfo } = req.body
    const userId = await User.create(userInfo)
    res.status(201).json(userId)
  })

  router.put('/:id', async (req, res) => {
    const { user: userInfo } = req.body
    const userId = await User.update(req.params.id, userInfo)
    res.status(201).json(userId)
  })

  router.delete('/:id', async (req, res) => {
    const userId = await User.delete(req.params.id)
    res.status(201).json(userId)
  })
}

module.exports = usersRoutes

const express = require('express')
const UserService = require('../services/User')
const validationHandler = require('../utils/middlewares/validationHandler')
const userSchema = require('../utils/schemas/userSchema')
const objectIdSchema = require('../utils/schemas/objectIdSchema')

function usersRoutes (app) {
  const router = express.Router()
  app.use('/api/users', router)

  const User = new UserService()

  router.get('/', async (req, res, next) => {
    try {
      const user = await User.get()
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })

  router.post('/', validationHandler(userSchema), async (req, res, next) => {
    try {
      const userId = await User.create(req.body)
      res.status(201).json(userId)
    } catch (error) {
      next(error)
    }
  })

  router.put('/:id',
    validationHandler(objectIdSchema, 'params', 'id'),
    validationHandler(userSchema),
    async (req, res, next) => {
      try {
        const userId = await User.update(req.params.id, req.body)
        res.status(201).json(userId)
      } catch (error) {
        next(error)
      }
    })

  router.delete('/:id', validationHandler(objectIdSchema, 'params', 'id'), async (req, res, next) => {
    try {
      const userId = await User.delete(req.params.id)
      res.status(201).json(userId)
    } catch (error) {
      next(error)
    }
  })
}

module.exports = usersRoutes

import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import models from '../models'
import config from '../config/auth'

const router = express.Router()
const User = models.User

router.get('/:id', (req, res) => {
  const id = req.params.id

  User.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).end()
        return
      }

      res.json(user)
  	})
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const user = req.body

  let newUser = {}
  let errors = []

  if (user.hasOwnProperty('name')) {
    if (typeof(user.name) !== 'string') {
      errors.push('Name must be a string.')
    }

    newUser.name = user.name
  }

  if (user.hasOwnProperty('email')) {
    if (typeof(user.email) !== 'string') {
      errors.push('Email must be a string.')
    }

    newUser.email = user.email
  }

  if (user.hasOwnProperty('password')) {
    if (typeof(user.password) !== 'string') {
      errors.push('Password must be a string.')
    }

    newUser.hash = bcrypt.hashSync(user.password, config.BCRYPT_NUM_ROUNDS)
  }

  if (errors.length > 0) {
    res.status(400).json({ errors: errors })
    return
  }

  User.update(newUser, {
    where: {
      id: id
    }
  }).then(result => {
    const affectedRows = result[0]

    if (affectedRows == 0) {
      res.status(400).json({ errors: ['User could not be updated.'] })
      return
    }

    res.json({
      affectedRows: affectedRows
    })
  })
})

export default router

import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import models from '../models'
import config from '../config/auth'

const router = express.Router()
const User = models.User

router.post('/signup', (req, res) => {
  const user = req.body

  let errors = []

  if (!user.hasOwnProperty('name')) {
    errors.push('Name must be specified.')
  }

  if (typeof(user.name) !== 'string') {
    errors.push('Name must be a string.')
  }

  if (!user.hasOwnProperty('email')) {
    errors.push('Email must be specified.')
  }

  if (typeof(user.email) !== 'string') {
    errors.push('Email must be a string.')
  }

  if (!user.hasOwnProperty('password')) {
    errors.push('Password must be specified.')
  }

  if (typeof(user.password) !== 'string') {
    errors.push('Password must be a string.')
  }

  if (errors.length > 0) {
    res.status(400).json({ errors: errors })
    return
  }

  User.findOne({
    where: {
      email: user.email
    }
  }).then(existingUser => {
    if (existingUser) {
      res.status(400).json({ errors: ['Email has already been registered.'] })
      return
    }

    bcrypt.hash(user.password, config.BCRYPT_NUM_ROUNDS, (err, hash) => {
      const newUser = {
        name: user.name,
        email: user.email,
        hash: hash
      }

      User.create(newUser)
        .then(newUserInstance => {
          res.status(200).end()
        })
    })
  })
})

router.post('/signin', (req, res) => {
  const user = req.body

  let errors = []

  if (!user.hasOwnProperty('email')) {
    errors.push('Email must be specified.')
  }

  if (typeof(user.email) !== 'string') {
    errors.push('Email must be a string.')
  }

  if (!user.hasOwnProperty('password')) {
    errors.push('Password must be specified.')
  }

  if (typeof(user.password) !== 'string') {
    errors.push('Password must be a string.')
  }

  if (errors.length > 0) {
    res.status(400).json({ errors: errors })
    return
  }

  User.findOne({
    where: {
      email: user.email
    }
  }).then(existingUser => {
    if (!existingUser) {
      res.status(401).json({ errors: ['Invalid email or password.'] })
      return
    }

    bcrypt.compare(user.password, existingUser.hash, (err, valid) => {
      if (!valid) {
        res.status(401).json({ errors: ['Invalid email or password.'] })
        return
      }

      const tokenPayload = {
        id: existingUser.id
      }

      const token = jwt.sign(tokenPayload, config.JWT_SECRET_KEY, {
        expiresIn: config.JWT_EXPIRATION_TIME
      })

      const response = {
        userId: existingUser.id,
        accessToken: token
      }

      res.json(response)
    })
  })
})

export default router

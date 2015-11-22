import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import models from '../models'
import config from '../config/auth'

const router = express.Router()
const User = models.User

router.post('/signup', (req, res) => {
  const user = req.body

  if (!user.hasOwnProperty('name')) {
    res.status(400).end()
    return
  }

  if (typeof(user.name) !== 'string') {
    res.status(400).end()
    return
  }

  if (!user.hasOwnProperty('email')) {
    res.status(400).end()
    return
  }

  if (typeof(user.email) !== 'string') {
    res.status(400).end()
    return
  }

  if (!user.hasOwnProperty('password')) {
    res.status(400).end()
    return
  }

  if (typeof(user.password) !== 'string') {
    res.status(400).end()
    return
  }

  User.findOne({
    where: {
      email: user.email
    }
  }).then(existingUser => {
    if (existingUser) {
      res.status(400).end()
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

  if (!user.hasOwnProperty('email')) {
    res.status(400).end()
    return
  }

  if (typeof(user.email) !== 'string') {
    res.status(400).end()
    return
  }

  if (!user.hasOwnProperty('password')) {
    res.status(400).end()
    return
  }

  if (typeof(user.password) !== 'string') {
    res.status(400).end()
    return
  }

  User.findOne({
    where: {
      email: user.email
    }
  }).then(existingUser => {
    if (!existingUser) {
      res.status(401).end()
      return
    }

    bcrypt.compare(user.password, existingUser.hash, (err, valid) => {
      if (!valid) {
        res.status(401).end()
        return
      }

      const tokenPayload = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email
      }

      const token = jwt.sign(tokenPayload, config.JWT_SECRET_KEY, {
        expiresIn: config.JWT_EXPIRATION_TIME
      })

      const response = {
        access_token: token
      }

      res.json(response)
    })
  })
})

export default router

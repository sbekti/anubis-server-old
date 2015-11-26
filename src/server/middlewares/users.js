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

export default router

import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/auth'

const queryKey = 'access_token'
const bodyKey = 'access_token'
const headerKey = 'Bearer'

const router = express.Router()

router.use((req, res, next) => {
  let token = ''
  let error = false

  if (req.query && req.query[queryKey]) {
    token = req.query[queryKey]
  }

  if (req.body && req.body[bodyKey]) {
    if (token) {
      error = true
    }

    token = req.body[bodyKey]
  }

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')

    if (parts.length === 2 && parts[0] === headerKey) {
      if (token) {
        error = true
      }

      token = parts[1]
    }
  }

  if (error) {
    res.status(400).end()
  } else {
    jwt.verify(token, config.JWT_SECRET_KEY, (tokenError, decoded) => {
      if (tokenError) {
        res.status(401).end()
        return
      } else {
        req.token = decoded
        next()
      }
    })
  }
})

export default router

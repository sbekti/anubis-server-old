import express from 'express'

const router = express.Router()

router.get('/', function(req, res, next) {
  const data = ['a', 'b', 'c', 'd']

  setTimeout(() => {
    res.json(data)
  }, 1000)
})

export default router

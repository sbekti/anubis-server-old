import express from 'express'

const router = express.Router()

router.get('/', function(req, res, next) {
  const data = ['a', 'b', 'c', 'd']

  setTimeout(() => {
    res.json(data)
  }, 1000)

  // res.status(500).send('Error')
})

export default router

import express from 'express'
import models from '../models'
const Device = models.Device

const router = express.Router()

router.get('/', (req, res) => {
  Device.findAll()
    .then(devices => {
      res.json(devices)
	  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  Device.findById(id)
    .then(device => {
      if (!device) {
        res.status(404).end()
        return
      }

      res.json(device)
  	})
})

router.post('/', (req, res) => {
  const device = req.body

  if (device.hasOwnProperty('id') ||
      device.hasOwnProperty('createdAt') ||
      device.hasOwnProperty('updatedAt')) {
    res.status(400).end()
    return
  }

  if (!device.hasOwnProperty('name')) {
    res.status(400).end()
    return
  }

  if (typeof(device.name) !== 'string') {
    res.status(400).end()
    return
  }

  if (!device.hasOwnProperty('state')) {
    res.status(400).end()
    return
  }

  if (typeof(device.state) !== 'number') {
    res.status(400).end()
    return
  }

  Device.create(device)
    .then(device => {
      res.json(device)
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const device = req.body

  if (device.hasOwnProperty('name') && (typeof(device.name) !== 'string')) {
    res.status(400).end()
    return
  }

  if (device.hasOwnProperty('state') && (typeof(device.state) !== 'number')) {
    res.status(400).end()
    return
  }

  Device.update(device, {
    where: {
      id: id
    }
  }).then(result => {
    const affectedRows = result[0]

    if (affectedRows == 0) {
      res.status(400).end()
      return
    }

    res.json({
      affectedRows: affectedRows
    })
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  Device.destroy({
    where: {
      id: id
    }
  }).then(affectedRows => {
    if (affectedRows == 0) {
      res.status(400).end()
      return
    }

    res.json({
      affectedRows: affectedRows
    })
  })
})

export default router

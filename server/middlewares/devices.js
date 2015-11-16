import express from 'express'
import models from '../models'

const router = express.Router()
const Device = models.Device

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

  const newDevice = {
    name: device.name,
    state: device.state
  }

  Device.create(newDevice)
    .then(newDeviceInstance => {
      res.json(newDeviceInstance)
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const device = req.body

  let newDevice = {}

  if (device.hasOwnProperty('name')) {
    if (typeof(device.name) !== 'string') {
      res.status(400).end()
      return
    }

    newDevice.name = device.name
  }

  if (device.hasOwnProperty('state')) {
    if (typeof(device.state) !== 'number') {
      res.status(400).end()
      return
    }

    newDevice.state = device.state
  }

  Device.update(newDevice, {
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

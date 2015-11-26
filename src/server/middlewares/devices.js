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
        res.status(404).json({ errors: ['Device could not be found.'] })
        return
      }

      res.json(device)
  	})
})

router.post('/', (req, res) => {
  const device = req.body

  let errors = []

  if (!device.hasOwnProperty('name')) {
    errors.push('Name must be specified.')
  }

  if (typeof(device.name) !== 'string') {
    errors.push('Name must be a string.')
  }

  if (!device.hasOwnProperty('state')) {
    errors.push('State must be specified.')
  }

  if (typeof(device.state) !== 'number') {
    errors.push('State must be a number.')
  }

  if (errors.length > 0) {
    res.status(400).json({ errors: errors })
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
  let errors = []

  if (device.hasOwnProperty('name')) {
    if (typeof(device.name) !== 'string') {
      errors.push('Name must be a string.')
    }

    newDevice.name = device.name
  }

  if (device.hasOwnProperty('state')) {
    if (typeof(device.state) !== 'number') {
      errors.push('State must be a number.')
    }

    newDevice.state = device.state
  }

  if (errors.length > 0) {
    res.status(400).json({ errors: errors })
    return
  }

  Device.update(newDevice, {
    where: {
      id: id
    }
  }).then(result => {
    const affectedRows = result[0]

    if (affectedRows == 0) {
      res.status(400).json({ errors: ['Device could not be updated.'] })
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
      res.status(400).json({ errors: ['Device could not be deleted.'] })
      return
    }

    res.json({
      affectedRows: affectedRows
    })
  })
})

export default router

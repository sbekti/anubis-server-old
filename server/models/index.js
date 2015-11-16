import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import envConfig from '../config/db'

const env = process.env.NODE_ENV || 'development'
const config = envConfig[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)
const db = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

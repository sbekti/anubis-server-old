import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import serveFavicon from 'serve-favicon'
import verifier from './middlewares/verifier'
import auth from './middlewares/auth'
import users from './middlewares/users'
import devices from './middlewares/devices'
import www from './middlewares/www'
import models from './models'
import serverConfig from './config/server'
import middlewaresConfig from './config/middlewares'

const app = express()

app.set('env', serverConfig.SERVER_ENV)
app.set('host', serverConfig.SERVER_HOST)
app.set('port', serverConfig.SERVER_PORT)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(serveFavicon(path.join(__dirname, '../../assets/images/favicon/favicon.ico')))
app.use(express.static(path.join(__dirname, '../../assets')))
app.use('/scripts', express.static(path.join(__dirname, '../../dist')))

// Auth API middleware
app.use(middlewaresConfig.API_AUTH_ENDPOINT, auth)

// Users API middleware
app.use(middlewaresConfig.API_USERS_ENDPOINT, verifier, users)

// Device API middleware
app.use(middlewaresConfig.API_DEVICES_ENDPOINT, verifier, devices)

// Frontend middleware
app.use(middlewaresConfig.WWW_ENDPOINT, www)

app.use((err, req, res, next) => {
  console.log('Error on request %s %s', req.method, req.url)
  console.log(err)
  console.log(err.stack)
  res.status(500).send('Internal server error')
})

models.sequelize.sync({ force: true }).then(() => {
  const server = app.listen(app.get('port'), () => {
    const host = server.address().address
    const port = server.address().port

    console.log(`Server is running at http://${host}:${port}`)
  })
})

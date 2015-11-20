import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import serveFavicon from 'serve-favicon'
import verifier from './middlewares/verifier'
import auth from './middlewares/auth'
import devices from './middlewares/devices'
import www from './middlewares/www'
import models from './models'

const app = express()

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || '0.0.0.0')
app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(cookieParser())
//app.use(serveFavicon(`${assetsPath}/assets/favicon.png`))
app.use(express.static(path.join(__dirname, '../assets')))
app.use('/scripts', express.static(path.join(__dirname, '../dist')))

// Auth API middleware
app.use('/api/v1/auth', auth)

// Device API middleware
app.use('/api/v1/devices', verifier, devices)

// Frontend middleware
app.use('/', www)

app.use((err, req, res, next) => {
  console.log('Error on request %s %s', req.method, req.url)
  console.log(err)
  console.log(err.stack)
  res.status(500).send('Internal server error')
})

models.sequelize.sync({ force: false }).then(() => {
  const server = app.listen(app.get('port'), () => {
    const host = server.address().address
    const port = server.address().port

    console.log(`Server is running at http://${host}:${port}`)
  })
})

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import serveFavicon from 'serve-favicon'
import api from './middlewares/api'
import www from './middlewares/www'

const app = express()

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || '0.0.0.0')
app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
//app.use(serveFavicon(`${assetsPath}/assets/favicon.png`))
app.use(express.static(path.join(__dirname, '../assets')))

// API middleware
app.use('/api/v1', api)

// Frontend middleware
app.use(www)

app.use((err, req, res, next) => {
  console.log('Error on request %s %s', req.method, req.url)
  console.log(err)
  console.log(err.stack)
  res.status(500).send('Internal server error')
})

const server = app.listen(app.get('port'), () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Server is running at http://${host}:${port}`)
})

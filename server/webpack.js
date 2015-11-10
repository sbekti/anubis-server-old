import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevConfig from '../webpack.dev.config'

export default function(app) {
  const compiler = webpack(webpackDevConfig)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true
  }))

  app.use(webpackHotMiddleware(compiler))
}

const DEFAULT_SERVER_ENV = 'development'
const DEFAULT_SERVER_HOST = '0.0.0.0'
const DEFAULT_SERVER_PORT = 5000

const config = {
  SERVER_ENV: process.env.NODE_ENV || DEFAULT_SERVER_ENV,
  SERVER_HOST: process.env.HOST || DEFAULT_SERVER_HOST,
  SERVER_PORT: process.env.PORT || DEFAULT_SERVER_PORT
}

export default config

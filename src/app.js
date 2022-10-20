const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index.js')

const session = require('express-session')
const passport = require('passport')

require('./db.js')

const server = express()

server.name = 'API'

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(morgan('dev'))
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

server.use(cookieParser('secretcode'))
server.enable('trust proxy')

// Express Session
server.use(
  session({
    name: 'e-wine',
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,

    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none'
    },
    proxy: true
  })
)

/* server.use(cookieParser('secretcode'))
server.enable('trust proxy') */

server.use(passport.initialize())
server.use(passport.session())
require('./config/passport.js')(passport)

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server

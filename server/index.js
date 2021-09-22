// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler()

const cookieParser = require('cookie-parser')
const session = require('express-session')
const express = require('express')
const bodyParser = require('body-parser')

const sessionRouter = require('./session')

app.prepare().then(() => {
  const port = 3000
  const server = express()
  server.use(bodyParser.json())
  server.use(session({
    secret: 'zZAai8301bSnuA8sabUwabxe3',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }))

  server.use('/api/session', sessionRouter)
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});
require('dotenv').config()

const http = require('http')
const path = require('path')

const express = require('express')
const helmet = require('helmet')

const PORT = 3000

const app = express()

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
}

const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = true
  if (isLoggedIn) {
    next()
  } else {
    res.status(401).json({
      error: 'you must be logged in'
    }) 
  }
}
 
app.use(helmet())
app.use(express.static('public'))

app.get('/auth/google', (req, res) => {})

app.get('/auth/google/callback', (req, res) => {})
 
app.get('/auth/logout', (req, res) => {}) 

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, 'secret.html')) 
})

app.get('/', checkLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

 
require('dotenv').config()

const http = require('http')
const path = require('path')

const { Strategy } = require('passport-google-oauth20') 
const passport = require('passport')
const express = require('express')
const helmet = require('helmet')

const PORT = 3000

const app = express()

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
}

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
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

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log('profile', profile)
  done(null, profile)
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))
 
app.use(helmet())
app.use(passport.initialize())
app.use(express.static('public'))

app.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/failure',
  session: false
}), (req, res) => {
  console.log('Google called us back!')
}) 
 
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

 
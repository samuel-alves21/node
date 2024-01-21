const http = require('http')

require('dotenv').config()

const mongoose = require('mongoose')

const { app } = require('./app')

const { loadPLanetsData } = require('./models/planets.model')
const { LoadLaunchData } = require('./models/launches.model')

// the app object is a listener for the native http.createServer()
const server = http.createServer(app)

const PORT = process.env.PORT || 8000

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.on('error', (error) => {
  console.error(error)
})
 
mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!')
})

const startServer = async () => {
  await mongoose.connect(MONGO_URL)
  await loadPLanetsData()
  await LoadLaunchData()

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

startServer()

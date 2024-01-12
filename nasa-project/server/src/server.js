const http = require('http')
const mongoose = require('mongoose')

const { app } = require('./app')

const { loadPLanetsData } = require('./models/planets.model')

// the app object is a listener for the native http.createServer()
const server = http.createServer(app)

const PORT = process.env.PORT || 8000

const MONGO_URL = 'mongodb+srv://samuel:10096577@cluster0.4rjtbcf.mongodb.net/nasa-api?retryWrites=true&w=majority'

mongoose.connection.on('error', (error) => {
  console.error(error)
})

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!')
})

const startServer = async () => {
  await mongoose.connect(MONGO_URL)
  await loadPLanetsData()

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

startServer()

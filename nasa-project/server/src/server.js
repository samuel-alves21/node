const http = require('http')

const { app } = require('./app')

const { loadPLanetsData } = require('./models/planets.model')

// the app object is a listener for the native http.createServer()
const server = http.createServer(app)

const PORT = process.env.PORT || 8000

loadPLanetsData()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  })
  .catch((error) => console.dir(error))

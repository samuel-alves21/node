const http = require('http')

const { app } = require('./app')

// the app object is a listener for the native http.createServer()
const server = http.createServer(app)

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

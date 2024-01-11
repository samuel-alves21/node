const express = require('express')
const cluster = require('cluster')
const os = require('os')

cluster.schedulingPolicy = cluster.SCHED_RR

const mytimer = (duration) => {
  const startTime = Date.now()
  while (Date.now() - startTime < duration) {
  }
}

const app = express()

app.get('/', (req, res) => {
  res.send(`Node Performance: ${cluster.pid}`)
})

app.get('/timer', (req, res) => {
  mytimer(10000)
  res.send(`timer expired...: ${cluster.pid}`)
})

if (cluster.isMaster) {
  console.log('master started...')
  os.cpus().forEach(() => {
    cluster.fork()
  })
} else {
  console.log('worker started...')

  app.listen(3000)
}


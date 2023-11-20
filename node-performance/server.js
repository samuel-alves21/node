const express = require('express')

const mytimer = (duration) => {
  const startTime = Date.now()
  while (Date.now() - startTime < duration) {
    console.log(Date.now() - startTime)
  }
}

const app = express()

app.get('/', (req, res) => {
  res.send('Node Performance')
})

app.get('/timer', (req, res) => {
  mytimer(10000)
  res.send('timer expired...')
})

app.listen(3000, () => {
  console.log('server running...')
})
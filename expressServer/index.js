const express = require('express')

const app = express()

const PORT = 3000

const hobbies = [
  {
    id: 0,
    hobbie: 'play videoGame'
  },
  {
    id: 1,
    hobbie: 'Watch anime'
  },
  {
    id: 2,
    hobbie: 'Learn Web Development'
  },
]

// sending any type of string will be converted to text/html
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/hobbies', (req, res) => {
  res.send(hobbies)
})



// using url parameters
app.get('/hobbies/:id', (req, res) => {
  const hobbie = hobbies[req.params.id]
  hobbie ? res.send(hobbies[req.params.id]) : res.status(404).send('<h1>hobbie not found</h1>')
})

app.post('/hobbies', (req, res) => {
  console.log('updating hobbies...')
  console.log(req.body)
  hobbies.push(req.body)
  res.send(hobbies)
})

// sending any tyoe of object will be converted to application/json
app.get('/content', (req, res) => {
  res.send({
    name: 'John',
    age: 30
  })
})

app.listen(PORT, () => {
  console.log('listening on port:', PORT)
}) 
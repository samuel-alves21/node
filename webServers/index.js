const http = require('http')

const PORT = 8000

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

// using the native http server from node
const server = http.createServer((req, res) => {

  // parsing the url to work with parameters 
  const parsedUrl = req.url.split('/') 
  
  if (parsedUrl[1] === '') {
    res.statusCode === 200
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<body>')
    res.write('<h1>Hello World!!</h1>')
    res.write('</body>')
    res.write('</html>')
    res.end()
  } else if (req.method === 'POST' && parsedUrl[1] === 'hobbies') {
    req.on('data', (data) => {
      const myData = data.toString()
      hobbies.push(JSON.parse(myData))
    })
    req.pipe(res)
  } else if (req.method === 'GET' && parsedUrl[1] === 'hobbies')  {
    if (parsedUrl.length === 2) {
      res.statusCode === 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(hobbies))
    } else {
      if (Number(parsedUrl[2]) >= 0 && Number(parsedUrl[2]) <= hobbies.length) {
        const hobbie = hobbies[Number(parsedUrl[2])]
        res.statusCode === 200
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<body>')
        res.write(`<h1>${hobbie.hobbie}</h1>`)
        res.write('</body>')
        res.write('</html>')
        res.end()
      } else {
        res.statusCode = 404
        res.end()
      }
    }
  } else {
    res.statusCode = 404
    res.end()
  }
})

server.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`)
})

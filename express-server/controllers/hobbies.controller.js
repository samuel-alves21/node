const hobbiesModel = require('../models/hobbies.model')
const hobbies = hobbiesModel.hobbies

// sending any type of string will be converted to text/html
function getHobbies (req, res) {
  res.send(hobbies)
}
 
// using url parameters
function getHobbie (req, res) {
  const hobbie = hobbies[req.params.id]
  hobbie ? res.send(hobbies[req.params.id]) : res.status(404).send('<h1>hobbie not found</h1>')
}

function postHobbie (req, res) {
  if (!req.body.hobbie) {
    res.status(400).json({ error: 'hobbie is required'  })
  } else {
    console.log('updating hobbies...')
    console.log(req.body)
    const newHobbie = {
      hobbie: req.body.hobbie,
      id: hobbies.length
    }
    hobbies.push(newHobbie)
    res.send(hobbies)
  }
}

module.exports = { 
  getHobbies,
  getHobbie,
  postHobbie
}
const express = require('express')

const hobbiesControler = require('../controllers/hobbies.controller')

const hobbiesRouter = express.Router()

// using a middleware only for this router
hobbiesRouter.use((req, res, next) => {
  console.log(`Ip adress: ${req.ip}`)
  next()
})

hobbiesRouter.get('/', hobbiesControler.getHobbies)
hobbiesRouter.get('/:id', hobbiesControler.getHobbie)
hobbiesRouter.post('/', hobbiesControler.postHobbie)

module.exports = {
  hobbiesRouter
}
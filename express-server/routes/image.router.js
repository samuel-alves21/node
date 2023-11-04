const express = require('express')

const imagesControler = require('../controllers/images.controller')

const imagesRouter = express.Router()

imagesRouter.get('/', imagesControler.getImage)


module.exports = {
  imagesRouter
}
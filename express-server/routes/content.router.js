const express = require('express')

const contentControler = require('../controllers/content.controller')

const contentRouter = express.Router()

contentRouter.get('/', contentControler.getContent) 

module.exports = {
  contentRouter
}
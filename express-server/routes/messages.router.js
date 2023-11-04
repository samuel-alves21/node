const express = require('express')

const messagesControler = require('../controllers/messages.controller')

const messagesRouter = express.Router()

messagesRouter.get('/', messagesControler.getMessages)


module.exports = {
  messagesRouter
}
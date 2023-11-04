const express = require('express')
const path = require('path')

const { hobbiesRouter } = require('./routes/hobbies.router')
const { messagesRouter } = require('./routes/messages.router')
const { contentRouter } = require('./routes/content.router')
const { imagesRouter } = require('./routes/image.router')

const { logTime } = require('./middlewares/logTime.middleware')

const app = express()

const PORT = 3000

// to use a middleware call the "app.use" and pass a fn with the "next" param alongside "req" and "res"  
app.use(logTime)

// this middleware will convert the request body to json if the content type is application/json
app.use(express.json())

app.use('/hobbies', hobbiesRouter)
app.use('/', messagesRouter)
app.use('/content', contentRouter)

//serving an image 
app.use('/images', imagesRouter)

//serving a site
app.use('/site', express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log('listening on port:', PORT)
})
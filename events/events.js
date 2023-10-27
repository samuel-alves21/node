const EventEmitter = require('events')

// creating an instance from the EventEmitter class
const button = new EventEmitter()

// setting a new event listener
button.on('click', () => {
  console.log('button was clicked!')
})

button.on('hover', (param) => {
  console.log('button was hovered and dispatch ', param.hoverEfect)
})

// emitting an event previously created with parameters
button.emit('hover', {
  hoverEfect: 'some effect'
})

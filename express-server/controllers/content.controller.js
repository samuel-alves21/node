// sending any type of object will be converted to application/json
function getContent(req, res) {
  res.send({
    name: 'John',
    age: 30
  })
}

module.exports = {
  getContent
}
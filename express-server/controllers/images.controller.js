const path = require('path')

function getImage(req, res) {
  const imgPath = path.join(__dirname, '..', 'public', 'assets', 'img','Wallpaper.jpg')
  res.sendfile(imgPath)
}

module.exports = {
  getImage
}
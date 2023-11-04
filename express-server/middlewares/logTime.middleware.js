function logTime(req, res, next) {
  // request came in 
  const start = Date.now()
  next()
  // request came out
  const delta = Date.now() - start 
  console.log(`method: ${req.method}\nURL: ${req.baseUrl}${req.url}\ntime: ${delta}ms`)
}

module.exports = {
  logTime
}
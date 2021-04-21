function errHandler(err, req, res, next) {
  if (err.name === '401') {
    res.status(401).json({message: 'Unauthenticate or Unauthorize'})
  } else if (err.name === '404') {
    res.status(404).json({message: 'Resource not found'})
  } else if (err.name === '400') {
    res.status(400).json({message: 'Invalid email or password'})
  } else if (err.name === '500') {
    res.status(500).json({message: 'Invalid server error'})
  }
}

module.exports = errHandler
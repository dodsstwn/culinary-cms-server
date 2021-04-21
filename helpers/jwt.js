const jwt = require('jsonwebtoken');

let JWT_SECRET = process.env.JWT_SECRET

// let JWT_SECRET = process.env.JWT_SECRET

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET)
}

function verifyLogin(token) {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = {
  generateToken,
  verifyLogin
}
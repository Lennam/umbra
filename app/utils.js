const jwt = require('jsonwebtoken')

module.exports.getToken = (payload = {}) => {
  return jwt.sign(payload, 'sdfsd', { expiresIn: '12h' })
}
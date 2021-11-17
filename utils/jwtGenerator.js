const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtGenerator = (user_id, username, email) => {
  const payload = {
    user: user_id,
    username: username,
    email: email
  }

  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1hr'})
}

module.exports = jwtGenerator
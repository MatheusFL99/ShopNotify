const jwt = require('jsonwebtoken')

const User = require('../models/user')

// get User pelo token
const getUserByToken = async token => {
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_USER)

  const userId = decoded.id

  const user = await User.findOne({ _id: userId })
  return user
}

module.exports = getUserByToken

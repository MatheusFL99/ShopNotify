const jwt = require('jsonwebtoken')

const Store = require('../models/store')

// get User pelo token
const getStoreByToken = async token => {
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_STORE)

  const storeId = decoded.id

  const store = await Store.findOne({ _id: storeId })
  return store
}

module.exports = getStoreByToken

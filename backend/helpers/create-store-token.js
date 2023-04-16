const jwt = require('jsonwebtoken')

const createStoreToken = async (store, req, res) => {
  // criar token
  const token = jwt.sign(
    {
      name: store.name,
      id: store._id
    },
    process.env.JWT_SECRET_STORE
  )

  // return token
  res.status(200).json({
    message: 'Você está autenticado!',
    token: token,
    storeId: store._id
  })
}

module.exports = createStoreToken

const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: {
      type: [Number], // formato [longitude, latitude]
      index: '2dsphere'
    }
  }
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteStores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    }
  ],
  favoriteProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  adresses: [
    {
      streetadress: String,
      complement: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    }
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Purchase'
    }
  ],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

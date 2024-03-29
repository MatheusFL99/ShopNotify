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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    }
  ],
  paymentMethods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod'
    }
  ],
  defaultPaymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod'
  },
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

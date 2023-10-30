const mongoose = require('mongoose')

const paymentMethodSchema = new mongoose.Schema({
  paymentName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  },
  titularName: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

module.exports = PaymentMethod

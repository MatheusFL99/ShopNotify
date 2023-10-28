const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  name: {
    type: String
  },
  streetaddress: {
    type: String,
    required: true
  },
  complement: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  country: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address

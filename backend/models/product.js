const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  store: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    favoritedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product

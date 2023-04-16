const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    expirationDate: {
      type: Date,
      required: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    },
    redeemedQuantity: {
      type: Number,
      default: 0
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    },
    active: {
      type: Boolean,
      default: true
    },
    reedemBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reedemed: {
      type: Boolean,
      default: false
    },
    reedemDate: {
      type: Date
    }
  },
  { timestamps: true }
)

const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon

const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  image: String,
  quantity: Number,
})

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered'],
      default: 'pending',
    },
    shippingAddress: {
      name: String,
      email: String,
      address: String,
      city: String,
      zipCode: String,
    },
    paymentIntentId: String,
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Order', orderSchema)

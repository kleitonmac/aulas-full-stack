const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Order = require('../models/Order')
const Cart = require('../models/Cart')

exports.createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body

    const cart = await Cart.findOne({ userId: req.user.user.id })
    if (!cart || cart.items.length === 0) {
      res.status(400)
      throw new Error('Cart is empty')
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'brl',
      metadata: { userId: req.user.user.id },
    })

    const order = new Order({
      userId: req.user.user.id,
      items: cart.items,
      total,
      shippingAddress,
      paymentIntentId: paymentIntent.id,
    })

    await order.save()
    await Cart.findOneAndDelete({ userId: req.user.user.id })

    res.json({ order, clientSecret: paymentIntent.client_secret })
  } catch (err) {
    next(err)
  }
}

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.user.id }).sort({
      createdAt: -1,
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

exports.getAllOrders = async (req, res, next) => {
  try {
    if (!req.user.user.isAdmin) {
      res.status(403)
      throw new Error('Admin access required')
    }
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    if (!req.user.user.isAdmin) {
      res.status(403)
      throw new Error('Admin access required')
    }

    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    )
    if (!order) {
      res.status(404)
      throw new Error('Order not found')
    }

    res.json(order)
  } catch (err) {
    next(err)
  }
}

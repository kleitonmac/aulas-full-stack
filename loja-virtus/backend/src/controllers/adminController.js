const User = require('../models/User')
const Order = require('../models/Order')

exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalOrders = await Order.countDocuments()
    res.json({ totalUsers, totalOrders })
  } catch (err) {
    next(err)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    next(err)
  }
}

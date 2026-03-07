const Cart = require('../models/Cart')

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.user.id }).populate(
      'userId',
    )
    if (!cart) return res.json({ items: [] })
    res.json(cart)
  } catch (err) {
    next(err)
  }
}

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, name, price, image, quantity = 1 } = req.body

    let cart = await Cart.findOne({ userId: req.user.user.id })
    if (!cart) {
      cart = new Cart({ userId: req.user.user.id, items: [] })
    }

    const existingItem = cart.items.find((item) => item.productId === productId)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ productId, name, price, image, quantity })
    }

    await cart.save()
    res.json(cart)
  } catch (err) {
    next(err)
  }
}

exports.updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body
    const cart = await Cart.findOne({ userId: req.user.user.id })
    if (!cart) {
      res.status(404)
      throw new Error('Cart not found')
    }

    const item = cart.items.find(
      (item) => item.productId === parseInt(req.params.productId),
    )
    if (!item) {
      res.status(404)
      throw new Error('Item not found')
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId !== parseInt(req.params.productId),
      )
    } else {
      item.quantity = quantity
    }

    await cart.save()
    res.json(cart)
  } catch (err) {
    next(err)
  }
}

exports.removeItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.user.id })
    if (!cart) {
      res.status(404)
      throw new Error('Cart not found')
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== parseInt(req.params.productId),
    )
    await cart.save()
    res.json(cart)
  } catch (err) {
    next(err)
  }
}

exports.clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.user.id })
    res.json({ message: 'Cart cleared' })
  } catch (err) {
    next(err)
  }
}

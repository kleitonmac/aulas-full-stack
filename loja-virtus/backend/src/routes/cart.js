const express = require('express')
const { auth } = require('../middleware/auth')
const cartController = require('../controllers/cartController')

const router = express.Router()

router.get('/', auth, cartController.getCart)
router.post('/add', auth, cartController.addToCart)
router.put('/update/:productId', auth, cartController.updateItem)
router.delete('/remove/:productId', auth, cartController.removeItem)
router.delete('/clear', auth, cartController.clearCart)

module.exports = router

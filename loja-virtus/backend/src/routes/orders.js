const express = require('express')
const { auth } = require('../middleware/auth')
const orderController = require('../controllers/orderController')

const router = express.Router()

router.post('/create', auth, orderController.createOrder)
router.get('/my-orders', auth, orderController.getMyOrders)
router.get('/', auth, orderController.getAllOrders)
router.put('/:id/status', auth, orderController.updateStatus)

module.exports = router

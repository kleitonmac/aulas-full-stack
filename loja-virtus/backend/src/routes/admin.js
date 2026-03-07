const express = require('express')
const { auth, adminAuth } = require('../middleware/auth')
const adminController = require('../controllers/adminController')

const router = express.Router()

router.get('/stats', auth, adminAuth, adminController.getStats)
router.get('/users', auth, adminAuth, adminController.getUsers)

module.exports = router

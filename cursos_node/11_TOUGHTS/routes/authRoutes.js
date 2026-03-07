/**
 * ROTAS DE AUTENTICAÇÃO
 * =====================
 * Define os endpoints para login, registro e logout de usuários
 */

const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// GET /login - Exibe página de login
router.get('/login', AuthController.login)

// POST /login - Processa login do usuário
router.post('/login', AuthController.loginPost)

// GET /register - Exibe página de registro
router.get('/register', AuthController.register)

// POST /register - Processa registro de novo usuário
router.post('/register', AuthController.registerPost)

// GET /logout - Encerra sessão do usuário
router.get('/logout', AuthController.logout)

module.exports = router

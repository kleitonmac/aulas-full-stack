/**
 * ROTAS DE PENSAMENTOS
 * ====================
 * Define todos os endpoints relacionados a pensamentos (CRUD)
 * Todas as rotas (exceto GET /) requerem autenticação
 */

const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// Importa o middleware que verifica se o usuário está autenticado
const checkAuth = require('../helpers/auth').checkAuth

// GET /toughts/add - Exibe formulário para criar pensamento (requer autenticação)
router.get('/add', checkAuth, ToughtController.createTought)

// POST /toughts/add - Salva novo pensamento (requer autenticação)
router.post('/add', checkAuth, ToughtController.createToughtSave)

// POST /toughts/remove - Deleta um pensamento (requer autenticação)
router.post('/remove', checkAuth, ToughtController.removeTought)

// GET /toughts/edit/:id - Exibe formulário de edição (requer autenticação)
router.get('/edit/:id', checkAuth, ToughtController.updateTought)

// POST /toughts/edit - Salva alterações de um pensamento (requer autenticação)
router.post('/edit', checkAuth, ToughtController.updateToughtPost)

// GET /toughts/dashboard - Exibe painel do usuário (requer autenticação)
router.get('/dashboard', checkAuth, ToughtController.dashboard)

// GET /toughts/ - Exibe todos os pensamentos (página inicial)
router.get('/', ToughtController.showToughts)

module.exports = router

// ========================================
// ROTAS - TASK ROUTES
// ========================================
// Este arquivo define as rotas para tarefas.
// Cada rota mapeia uma URL a um método do TaskController.
// 'router.get()' = requisição GET (buscar dados)
// 'router.post()' = requisição POST (enviar dados)

const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

// Rota GET /tasks/add - chama createTask (exibir formulário de criação)
router.get('/add', TaskController.createTask)

// Rota GET /tasks - chama showTasks (exibir todas as tarefas)
router.get('/', TaskController.showTasks)

// Exporta o router para ser usado em index.js
module.exports = router

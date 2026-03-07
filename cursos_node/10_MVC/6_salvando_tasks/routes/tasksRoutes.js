// ========================================
// ROTAS - TASK ROUTES
// ========================================
// Este arquivo define as rotas para operações com tarefas.
// Combina GET (buscar) e POST (enviar dados).

const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

// Rota GET /tasks/add - exibe o formulário de criação
router.get('/add', TaskController.createTask)

// Rota POST /tasks/add - SALVA a nova tarefa no banco de dados
router.post('/add', TaskController.createTaskSave)

// Rota GET /tasks - exibe todas as tarefas
router.get('/', TaskController.showTasks)

module.exports = router

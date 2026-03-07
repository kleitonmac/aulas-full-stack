// ========================================
// CONTROLLER - TASK CONTROLLER
// ========================================
// Este arquivo define o Controller com a lógica de negócio para tarefas.
// Cada método estático é uma ação que pode ser chamada por uma rota.

const Task = require('../models/Task')

module.exports = class TaskController {
  // Ação: CREATE - exibe o formulário para criar uma nova tarefa
  static createTask(req, res) {
    res.render('tasks/create')
  }

  // Ação: READ - exibe todas as tarefas
  static showTasks(req, res) {
    res.render('tasks/all')
  }
}

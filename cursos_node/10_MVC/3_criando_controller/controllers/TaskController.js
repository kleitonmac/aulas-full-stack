// ========================================
// CONTROLLER - TASK CONTROLLER
// ========================================
// Este arquivo define o Controller que contém a lógica de negócio para tarefas.
// O Controller é responsável por processar requisições e chamar o Model ou View.
// Cada método estático corresponde a uma ação específ ica (CREATE, READ, UPDATE, DELETE).

const Task = require('../models/Task')

// Exporta uma classe com métodos estáticos (ações do controller)
module.exports = class TaskController {
  // Método: renderiza a view para criar uma nova tarefa
  // Esta é a ação CREATE (exibir formulário)
  static createTask(req, res) {
    res.render('tasks/create') // Renderiza a view de criação
  }
}

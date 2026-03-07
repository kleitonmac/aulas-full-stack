// ========================================
// CONTROLLER - TASK CONTROLLER
// ========================================
// Este controlador demonstra o CRUD (Create, Read, Update, Delete).
// Cada método manipula lógica de negócio antes de salvar/recuperar dados.

const Task = require('../models/Task')

module.exports = class TaskController {
  // Ação: exibe o formulário para criar tarefa
  static createTask(req, res) {
    res.render('tasks/create')
  }

  // Ação: SAVE - processa o envio do formulário e SALVA a tarefa no banco
  static createTaskSave(req, res) {
    // Extrai os dados do formulário
    const task = {
      title: req.body.title, // Título vindo do formulário
      description: req.body.description, // Descrição vindo do formulário
      done: false, // Nova tarefa começa como não concluída
    }

    // Task.create() - INSERE a tarefa no banco de dados
    Task.create(task)
      .then(res.redirect('/tasks')) // Redireciona após salvar
      .catch((err) => console.log()) // Trata erros
  }

  // Ação: READ - exibe todas as tarefas
  static showTasks(req, res) {
    res.render('tasks/all')
  }
}

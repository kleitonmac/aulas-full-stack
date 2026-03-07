// ========================================
// CONTROLLER - TASK CONTROLLER
// ========================================
// Este controlador adiciona a ação de BUSCA de tarefas (READ).
// Recupera os dados do banco e os envia para a view renderizar.

const Task = require('../models/Task')

module.exports = class TaskController {
  // Ação: exibe o formulário para criar tarefa
  static createTask(req, res) {
    res.render('tasks/create')
  }

  // Ação: SAVE - processa o envio do formulário e SALVA a tarefa
  static createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    }

    Task.create(task)
      .then(res.redirect('/tasks'))
      .catch((err) => console.log())
  }

  // Ação: READ - BUSCA TODAS as tarefas do banco de dados e as exibe
  static showTasks(req, res) {
    // Task.findAll() - recupera TODOS os registros da tabela
    // { raw: true } - retorna dados simples (sem metadados Sequelize)
    Task.findAll({ raw: true })
      .then((data) => {
        // Envia os dados para a view 'tasks/all' renderizar em HTML
        res.render('tasks/all', { tasks: data })
      })
      .catch((err) => console.log(err))
  }
}

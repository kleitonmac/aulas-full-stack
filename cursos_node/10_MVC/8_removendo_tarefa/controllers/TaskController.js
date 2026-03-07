// ========================================
// CONTROLLER - TASK CONTROLLER
// ========================================
// Este controlador adiciona a ação de REMOVER tarefas (DELETE).
// Demonstra o CRUD completo: Create, Read, Delete.

const Task = require('../models/Task')

module.exports = class TaskController {
  // Ação: exibe o formulário para criar tarefa
  static createTask(req, res) {
    res.render('tasks/create')
  }

  // Ação: SAVE - INSERE uma nova tarefa
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

  // Ação: READ - BUSCA todas as tarefas
  static showTasks(req, res) {
    Task.findAll({ raw: true })
      .then((data) => {
        // Verifica se não há tarefas para exibir mensagem apropriada
        let emptyTasks = false

        if (data.length === 0) {
          emptyTasks = true
        }

        res.render('tasks/all', { tasks: data, emptyTasks })
      })
      .catch((err) => console.log(err))
  }

  // Ação: DELETE - REMOVE uma tarefa pelo ID
  static removeTask(req, res) {
    const id = req.body.id

    // Task.destroy() - DELETA um registro do banco
    // where: { id: id } - especifica qual registro deletar
    Task.destroy({ where: { id: id } })
      .then(res.redirect('/tasks')) // Redireciona após deletar
      .catch((err) => console.log())
  }
}

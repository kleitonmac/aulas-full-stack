// ========================================
// CONTROLLER - TASK CONTROLLER
// ========================================
// Este controlador adiciona a ação de EDITAR tarefas.
// A edição começa buscando o registro atual (findOne).

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
        let emptyTasks = false

        if (data.length === 0) {
          emptyTasks = true
        }

        res.render('tasks/all', { tasks: data, emptyTasks })
      })
      .catch((err) => console.log(err))
  }

  // Ação: DELETE - REMOVE uma tarefa
  static removeTask(req, res) {
    const id = req.body.id

    Task.destroy({ where: { id: id } })
      .then(res.redirect('/tasks'))
      .catch((err) => console.log())
  }

  // Ação: EDIT - BUSCA uma tarefa específica para exibir no formulário de edição
  static updateTask(req, res) {
    const id = req.params.id

    // Task.findOne() - busca UM registro com base na condição
    // { where: { id: id }, raw: true } - filtra por ID e retorna objeto simples
    Task.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        // Renderiza a view 'tasks/edit' com os dados da tarefa para editá-la
        res.render('tasks/edit', { task: data })
      })
      .catch((err) => console.log())
  }
}

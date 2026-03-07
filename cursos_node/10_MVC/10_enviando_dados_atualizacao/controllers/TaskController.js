// ========================================
// CONTROLLER - TASK CONTROLLER (CRUD COMPLETO)
// ========================================
// Este controlador implementa O CRUD COMPLETO:
// CREATE (createTask, createTaskSave)
// READ (showTasks, updateTask)
// UPDATE (updateTaskPost) - AÇÃO NOVA
// DELETE (removeTask)

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

  // Ação: READ - BUSCA e LISTA todas as tarefas
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

  // Ação: EDIT - BUSCA uma tarefa para editar
  static updateTask(req, res) {
    const id = req.params.id

    Task.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('tasks/edit', { task: data })
      })
      .catch((err) => console.log())
  }

  // Ação: UPDATE - MODIFICA uma tarefa existente (NEW CRUD ACTION)
  static updateTaskPost(req, res) {
    const id = req.body.id

    // Objeto com os dados ATUALIZADOS
    const task = {
      title: req.body.title,
      description: req.body.description,
    }

    // Task.update() - MODIFICA os campos da tarefa
    // Primeiro parâmetro: novos dados
    // Segundo parâmetro: condição (qual linha atualizar)
    Task.update(task, { where: { id: id } })
      .then(res.redirect('/tasks')) // Redireciona após atualizar
      .catch((err) => console.log())
  }
}

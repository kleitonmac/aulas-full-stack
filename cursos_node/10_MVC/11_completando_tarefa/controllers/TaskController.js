// ========================================
// CONTROLLER - TASK CONTROLLER (CRUD + TOGGLE)
// ========================================
// Este controlador adiciona a ação de MARCAR tarefas como concluídas (toggleTaskStatus).
// É um exemplo de UPDATE seletivo de apenas UM campo.

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
      done: false, // Nova tarefa é criada como não concluída
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

  // Ação: EDIT - BUSCA uma tarefa para editar título e descrição
  static updateTask(req, res) {
    const id = req.params.id

    Task.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('tasks/edit', { task: data })
      })
      .catch((err) => console.log())
  }

  // Ação: UPDATE - MODIFICA título e descrição de uma tarefa
  static updateTaskPost(req, res) {
    const id = req.body.id

    const task = {
      title: req.body.title,
      description: req.body.description,
    }

    Task.update(task, { where: { id: id } })
      .then(res.redirect('/tasks'))
      .catch((err) => console.log())
  }

  // Ação: TOGGLE - MARCA/DESMARCA uma tarefa como concluída (NEW ACTION)
  static toggleTaskStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    // Objeto com apenas o campo 'done' (valor invértido)
    // Se done era '0' (false), torna true, e vice-versa
    const task = {
      done: req.body.done === '0' ? true : false,
    }

    console.log(task)

    // Task.update() - atualiza APENAS o campo 'done'
    Task.update(task, { where: { id: id } })
      .then(res.redirect('/tasks')) // Redireciona após atualizar
      .catch((err) => console.log())
  }
}

// ========================================
// MODEL (MODELO) - TAREFA
// ========================================
// Este arquivo define o modelo 'Task' (Tarefa) que representa a tabela de tarefas no banco.
// O Model é parte essencial da arquitetura MVC.

const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// Define o modelo Task com seus campos (colunas da tabela)
const Task = db.define('Task', {
  // Campo 'title': título da tarefa
  title: {
    type: DataTypes.STRING, // Tipo: texto
    allowNull: false, // Obrigatório
  },
  // Campo 'description': descrição da tarefa
  description: {
    type: DataTypes.STRING, // Tipo: texto
  },
  // Campo 'done': indica se a tarefa foi concluída
  done: {
    type: DataTypes.BOOLEAN, // Tipo: booleano (true/false)
  },
})

// Exporta o modelo para ser usado pelos Controllers
module.exports = Task

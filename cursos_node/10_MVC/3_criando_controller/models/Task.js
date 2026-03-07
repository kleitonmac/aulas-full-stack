// ========================================
// MODEL (MODELO) - TAREFA
// ========================================
// Este arquivo define o modelo 'Task' que representa a tabela de tarefas.
// O Model é a camada que interage com o banco de dados.

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
    type: DataTypes.BOOLEAN, // Tipo: booleano
  },
})

// Exporta o modelo para ser usado pelos Controllers
module.exports = Task

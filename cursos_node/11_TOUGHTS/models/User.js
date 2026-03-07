/**
 * MODELO DE USUÁRIO
 * ==================
 * Define a estrutura da tabela 'User' no banco de dados
 * Um usuário pode ter vários pensamentos (Toughts)
 */

const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// Define o modelo User com seus campos
const User = db.define('User', {
  // Campo: nome do usuário
  name: {
    type: DataTypes.STRING, // Tipo: texto
    allowNull: false, // Não pode ser vazio
  },
  // Campo: email do usuário (deve ser único)
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Campo: senha criptografada do usuário
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = User
